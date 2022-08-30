from flask import Flask, render_template, jsonify, request,make_response
from pymongo import MongoClient
from dotenv import load_dotenv
import os 

load_dotenv()
mySecret = os.environ.get('MySecret')

from poster import poster_bp

client = MongoClient('URL')
db = client.simple_poster


app = Flask(__name__)


app.register_blueprint(poster_bp, url_prefix="/poster")


@app.route('/')
def home():
    print(mySecret)
    return render_template("home.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)