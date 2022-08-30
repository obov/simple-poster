from flask import Blueprint, render_template, jsonify, request
from pymongo import MongoClient

from dotenv import load_dotenv
import os 

load_dotenv()
DB_URL = os.environ.get('DB_URL')


# import time
import datetime

from fakedb import fake_db # 임시 db파일 입니다


client = MongoClient(DB_URL, tls=True, tlsAllowInvalidCertificates=True) 
db = client.simple_poster

poster_bp = Blueprint("poster", __name__)


@poster_bp.route('/list',methods=['GET'])
def get_poster_list():
    # time.sleep(3)
    posters = list(db.poster.find({},{"_id":False}))
    return jsonify({"data":posters})


@poster_bp.route("/")
def poster():
    return render_template("poster.html")
        

@poster_bp.route("/write")
def post_write():
    return render_template("new_poster.html")


@poster_bp.route("/view", methods=["GET"])
def post_view():
        ## validator
    id = request.args["id"]
    print(id)
    # post = db.poster.find_one({"id":id})
    return jsonify({"msg":"success"})


@poster_bp.route("/submit", methods=["POST"])
def post_submit():
    ## validator
    print("submit")

    # username_receive = request.form["username_give"]
    title_receive = request.form["title_give"]
    content_receive = request.form["content_give"]
    time = str(datetime.datetime.now()).split(".")[0]
    id = db.index.find_one({}, {"_id":False})["index"]

    doc = {
        "id": id,
        # "username": username_receive,
        "title": title_receive,
        "content": content_receive,
        "time": time,
    }

    id += 1
    db.index.update_one({}, {"$set": {"index": id}})

    print(doc)
    db.poster.insert_one(doc)

    return jsonify({"msg":"success"})