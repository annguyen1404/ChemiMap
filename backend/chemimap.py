from flask import Flask
# from flask import Flask, jsonify, request
# from pymongo import MongoClient
# from neo4j import GraphDatabase

app = Flask(__name__)

# Example route for testing
@app.route('/')
def home():
    return "Chemimap Backend Running"

if __name__ == '__main__':
    app.run(debug=True)
