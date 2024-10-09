from flask import Flask, jsonify
from pymongo import MongoClient
# from neo4j import GraphDatabase

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['chemi_map']
articles_collection = db['articles']

# Example route for testing
@app.route('/')
def home():
    return "ChemiMap Backend Running"

# Define the endpoint to get full article by article_id
@app.route('/api/papers/<string:article_id>', methods=['GET'])
def get_article_by_id(article_id):
    article = articles_collection.find_one({"article_code": article_id})
    if article:
        article['_id'] = str(article['_id'])  # Convert ObjectId to string
        return jsonify(article), 200
    else:
        return jsonify({"error": "Article not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



