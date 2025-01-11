from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import MarkdownTextSplitter
from langchain.chains import ConversationalRetrievalChain
import glob
from pathlib import Path

load_dotenv()

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not found in environment variables. Please set it in .env file")

app = FastAPI()

# Configure CORS with more specific settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Pepsi Promo Copilot API is running"}

# Initialize OpenAI
embeddings = OpenAIEmbeddings()

# Load and process documents
def load_documents():
    # Get the absolute path to the data directory
    current_dir = Path(__file__).parent.parent
    data_dir = current_dir / "data"
    
    docs = []
    for filename in glob.glob(str(data_dir / "**/*.md"), recursive=True):
        with open(filename, 'r') as f:
            content = f.read()
            docs.append({"content": content, "source": filename})
    
    if not docs:
        raise ValueError(f"No markdown files found in {data_dir}")
    
    text_splitter = MarkdownTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = []
    metadatas = []
    
    for doc in docs:
        splits = text_splitter.split_text(doc["content"])
        texts.extend(splits)
        metadatas.extend([{"source": doc["source"]} for _ in splits])
    
    return texts, metadatas

# Initialize vector store
try:
    texts, metadatas = load_documents()
    vectorstore = Chroma.from_texts(texts=texts, embedding=embeddings, metadatas=metadatas)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
except ValueError as e:
    raise HTTPException(status_code=500, detail=str(e))

# Initialize chat model and chain
llm = ChatOpenAI(
    temperature=0,
    model="gpt-4-1106-preview"
)

qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    return_source_documents=True
)

class Query(BaseModel):
    question: str
    chat_history: Optional[List[tuple]] = []

class Response(BaseModel):
    answer: str
    sources: List[str]

@app.post("/api/analyze", response_model=Response)
async def analyze_promotion(query: Query):
    try:
        # Format the prompt to focus on promotional guidelines
        enhanced_question = f"""Based on Pepsi's promotional guidelines and best practices, please analyze the following: {query.question}
        
        Consider:
        1. Seasonal timing and duration
        2. Pricing and discount strategy
        3. Retailer collaboration requirements
        4. Past successful campaigns
        
        Provide specific recommendations and cite relevant guidelines."""

        # Get response from the chain
        result = qa_chain({"question": enhanced_question, "chat_history": query.chat_history})
        
        # Extract unique sources
        sources = list(set([doc.metadata["source"] for doc in result["source_documents"]]))
        
        return Response(
            answer=result["answer"],
            sources=sources
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
