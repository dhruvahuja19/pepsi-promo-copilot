# Pepsi Promotional Calendar Copilot

An AI-powered tool to help sales teams plan and validate promotional calendars against Pepsi's best practices and guidelines. The system uses advanced RAG (Retrieval Augmented Generation) to provide context-aware recommendations based on Pepsi's internal documentation.

## Features

- **Smart Campaign Analysis**: Analyze promotional plans against established best practices
- **Historical Insights**: Access historical campaign data and success metrics
- **Seasonal Intelligence**: Get real-time recommendations based on seasonal timing
- **Price Optimization**: Validate pricing and discount strategies
- **Collaboration Guidelines**: Review retailer collaboration requirements
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Secure**: Environment-based configuration for API keys and sensitive data

## Project Structure

```
pepsi-promo-copilot/
├── data/                   # Training data and guidelines
│   ├── best_practices/     # Company best practices documents
│   ├── case_studies/       # Historical campaign data
│   └── guidelines/         # Retailer and collaboration guidelines
├── src/                    # Backend Python code
│   ├── main.py            # FastAPI application
│   └── requirements.txt    # Python dependencies
└── frontend/              # Next.js frontend application
    ├── app/               # Next.js 13+ app directory
    ├── components/        # Reusable UI components
    └── package.json       # Frontend dependencies
```

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- OpenAI API key
- Git (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pepsi-promo-copilot.git
cd pepsi-promo-copilot
```

### 2. Backend Setup

1. Create and activate a virtual environment:
```bash
# On macOS/Linux
python -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

2. Install Python dependencies:
```bash
cd src
pip install -r requirements.txt
```

3. Create a `.env` file in the src directory:
```bash
# Required
OPENAI_API_KEY=your_api_key_here

# Optional
PORT=8000
HOST=0.0.0.0
```

4. Start the backend server:
```bash
# Development
uvicorn main:app --reload

# Production
python main.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage Guide

1. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - You'll see the main interface with a form to input campaign details

2. **Submit a Campaign for Analysis**
   - Enter your promotional campaign details in the text area
   - Include information about:
     - Campaign duration and timing
     - Target audience
     - Pricing and discount strategies
     - Distribution channels
     - Marketing activities
     - Budget allocation

3. **Review Analysis**
   - The system will provide a comprehensive analysis including:
     - Brand alignment assessment
     - Market potential evaluation
     - Timing and seasonality considerations
     - Pricing strategy validation
     - Retailer collaboration suggestions
     - Risk assessment
     - Optimization recommendations

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **LangChain**: Framework for developing applications powered by language models
- **ChromaDB**: Vector store for efficient similarity search
- **OpenAI GPT-4**: Advanced language model for analysis
- **Python-dotenv**: Environment variable management

### Frontend
- **Next.js 13+**: React framework with app directory structure
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **TypeScript**: Type-safe JavaScript
- **React**: UI library

## Troubleshooting

1. **Backend Issues**
   - Ensure OpenAI API key is correctly set in `.env`
   - Check if all required Python packages are installed
   - Verify the backend is running on port 8000

2. **Frontend Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Ensure Next.js is properly configured

3. **API Connection Issues**
   - Check if CORS is properly configured
   - Verify network connectivity between frontend and backend
   - Check browser console for error messages

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the development team or create an issue in the repository.
