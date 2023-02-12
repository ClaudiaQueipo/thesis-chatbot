from pymongo import MongoClient

MONGO_URI = 'mongodb://localhost'

client = MongoClient(MONGO_URI)
 
db = client['thesis-chatbot']
collection = db['unknow-questions']

def insert_question(question):
    try:
        collection.insert_one(question)
        return "Successfully insert"
    except Exception as error:
        return f"Error {error}"

def generate_report():
    try:
        results = collection.find()
        
        return results
    except Exception as error:
        return f"Error: {error}"

