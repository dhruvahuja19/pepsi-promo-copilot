#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Pepsi Promo Copilot...${NC}"

# Check if Python 3.13 is installed
if ! command -v python3.13 &> /dev/null; then
    echo -e "${RED}❌ Python 3.13 is required but not installed.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is required but not installed.${NC}"
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${BLUE}📦 Creating virtual environment...${NC}"
    python3.13 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo -e "${BLUE}📦 Installing Python dependencies...${NC}"
pip install -e .

# Check if .env exists, if not create it
if [ ! -f "src/.env" ]; then
    echo -e "${BLUE}📝 Creating .env file...${NC}"
    echo "OPENAI_API_KEY=" > src/.env
    echo -e "${RED}⚠️  Please add your OpenAI API key to src/.env${NC}"
    exit 1
fi

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install

# Start both servers
echo -e "${GREEN}🚀 Starting servers...${NC}"
trap 'kill 0' SIGINT  # Kill all processes when Ctrl+C is pressed

# Start backend
cd ../src
uvicorn main:app --reload &

# Start frontend
cd ../frontend
npm run dev &

# Wait for all background processes
wait
