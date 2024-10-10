# ChemiMap Backend API

This is a backend Flask API for the ChemiMap application. It connects to a MongoDB and an Elasticsearch service to serve articles related to chemical-disease interactions. The API provides several endpoints to interact with the data and perform searches.

## Prerequisites
- MongoDB running on `localhost:27017`
- Elasticsearch running on `localhost:9200`
- Python environment with required libraries (`flask`, `pymongo`, `elasticsearch`)

## Dependencies
- `flask`
- `pymongo`
- `elasticsearch`

## Running the Application
1. Ensure MongoDB and Elasticsearch are running locally.
2. Activate the virtual environment and run the Flask app:
   ```bash
   source venv/bin/activate
   python3 chemimap.py
   ```

## Endpoints

*for development using ec2-public-ip = http://35.89.243.42/

### 1. Health Check
- **URL**: `/`
- **Method**: `GET`
- **Description**: Basic health check endpoint to ensure the server is running.
- **Response Example**:
   "ChemiMap Backend Running"


### 2. Get Full Article by ID (MongoDB)
- **URL**: `/api/papers/<article_id>`
- **Method**: `GET`
- **Description**: Retrieves the full article details from MongoDB using the `article_id`.
- **Parameters**:
  - `article_id` (string): The unique identifier of the article.

- **Example**:
  
  Command:

  `curl http://35.89.243.42:5000/api/papers/439781`

  Response:


  ```json
  {
    "article_code": "439781",
    "title": "Indomethacin induced hypotension in sodium and volume depleted rats.",
    "abstract": "After a single oral dose of 4 mg/kg indomethacin (IDM) to sodium and volume depleted rats plasma renin activity (PRA)...",
    "chemicals": "['Indomethacin', 'sodium', 'indomethacin', 'IDM', 'sodium']",
    "diseases": "['hypotension']",
    "chemical_ids": "['D007213']",
    "disease_ids": "['D007022']"
  }

### 3. Search Articles (Elasticsearch)
- **URL**: `/api/search/`
- **Method**: `GET`
- **Description**: Search articles based on a query term using Elasticsearch.
- **Parameters**:
  - `query` (string): The search query.
  - `limit` (integer): Maximum number of results to return. Default is 10.
  - `skip` (integer): Number of results to skip for pagination. Default is 0.
- **Example**:
  
  Command:

  `curl "http://35.89.243.42:5000/api/search/?query=cancer&limit=3&skip=1"`

  Response:


  ```json
  [
    {
      "article_code": "8701013",
      "title": "Famotidine-associated delirium. A series of six cases.",
      "abstract": "Famotidine is a histamine H2-receptor antagonist used in inpatient settings for prevention of stress ulcers...",
      "chemicals": "['Famotidine']",
      "diseases": "['delirium']"
    },
    {
      "article_code": "439781",
      "title": "Indomethacin induced hypotension in sodium and volume depleted rats.",
      "abstract": "After a single oral dose of 4 mg/kg indomethacin (IDM)...",
      "chemicals": "['Indomethacin']",
      "diseases": "['hypotension']"
    }
  ]
 