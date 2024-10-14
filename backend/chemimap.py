from flask import Flask, jsonify, request
from pymongo import MongoClient
from elasticsearch import Elasticsearch

app = Flask(__name__)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client['chemi_map']
articles_collection = db['articles']

# Elasticsearch connection
es = Elasticsearch([{'host': 'localhost', 'port': 9200,'scheme': 'http'}])

# Health check route
@app.route('/')
def home():
    return "ChemiMap Backend Running"

# MongoDB article lookup
@app.route('/api/papers/<string:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = articles_collection.find_one({"article_code": article_id})
    if article:
        article['_id'] = str(article['_id'])  # Convert ObjectId to string
        return jsonify(article), 200
    else:
        return jsonify({"error": "Article not found"}), 404

# Elasticsearch search endpoint
@app.route('/api/search/', methods=['GET'])
def search_articles():
    query = request.args.get('query', '')
    limit = int(request.args.get('limit', 10))  # Default limit to 10
    skip = int(request.args.get('skip', 0))  # Default skip to 0

    # Elasticsearch search query
    search_body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title", "abstract", "chemicals", "diseases"]
            }
        },
        "from": skip,
        "size": limit
    }

    # Perform the search
    results = es.search(index='articles', body=search_body)
    hits = results['hits']['hits']

    # Return the relevant information
    response = [hit["_source"] for hit in hits]

    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)