# ChemiMap

ChemiMap is a web application that allows users to search for biomedical research papers and visualize the relationships between chemicals and diseases using an interactive knowledge graph.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the App](#running-the-app)

## Features
- Biomedical literature search
- Interactive knowledge graph of chemical-disease relationships
- Entity insights dashboard for detailed analysis
- Annotated biomedical papers with highlighted entities and relationships

## Tech Stack
- **Frontend**: React
- **Backend**: Python (Flask)
- **Database**: MongoDB (for data storage), Neo4j (for graph storage)
- **Search Engine**: Elasticsearch
- **Deployment**: AWS

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.6 or higher)

## Setup

### 1. Clone the Repo
```bash
git clone https://github.com/annguyen1404/chemimap.git
cd chemimap
```

### 2. Set Up the Frontend
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### 3. Set Up the Backend
```bash
# Navigate to backend folder
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

```

### 4. Start MongoDB, Neo4j, and Elasticsearch
Ensure databases are running before starting the application. **Skip this step for now since databases aren't set up yet.**  

## Running the App

- Navigate to the backend directory and run:
    ```bash
    python chemimap.py
    ```

- In a new terminal window, navigate to the frontend directory and run:
    ```bash
    npm start
    ```