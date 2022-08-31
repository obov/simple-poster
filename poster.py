from flask import Blueprint, render_template, jsonify, request
from pymongo import MongoClient
from dotenv import load_dotenv

import time
import datetime
import os
import jwt
import hashlib


load_dotenv()
URL = os.environ.get("MongoDB_URL")
KEY = os.environ.get("SECRET_KEY")

client = MongoClient(URL, tls=True, tlsAllowInvalidCertificates=True) 
db = client.simple_poster

poster_bp = Blueprint("poster", __name__)


@poster_bp.route("/")
def poster():
    return render_template("poster.html")


@poster_bp.route("/write")
def post_write():
    return render_template("new_poster.html")
    # token = request.cookies.get("logintoke")
    # if token is not None:
    #     return render_template("new_poster.html")
    # else:
    #     return render_template("login.html")


@poster_bp.route('/list',methods=['GET'])
def get_list():
    # time.sleep(3)
    posters = list(db.poster.find({},{"_id":False}))
    posters.reverse()
    return jsonify({"data":posters})


@poster_bp.route("/view", methods=["GET"])
def post_view():
        ## validator
    id = int(request.args["id"])    
    post = db.poster.find_one({"id": id}, {"_id": False})

    return jsonify(post)


@poster_bp.route("/edit",methods=['GET','POST'])
def get_edit():
    print(request.method)
    if request.method == "GET" : 
        id = int(request.args["id"])
        post = db.poster.find_one({"id": id}, {"_id": False})
        title = post["title"]
        content = post["content"]
        return render_template("edit.html",title=title,content=content)
    else:
        id = request.form.get("id")
        title = request.form.get("title")
        content = request.form.get("content")
        
        return {"msg" : "post"}


@poster_bp.route("/submit", methods=["POST"])
def post_submit():
    ## validator
    token = request.cookies.get("logintoken")

    if token is not None:
        try:
            payload = jwt.decode(token, KEY, algorithms=["HS256"])
            username_receive = payload["username"]
        except (jwt.ExpiredSignatureError, jwt.exceptions.DecodeError):
            return jsonify({"success": False})
    else: username_receive = "annonymous"

    title_receive = request.form["title_give"]
    content_receive = request.form["content_give"]
    time = str(datetime.datetime.now()).split(".")[0]
    id = db.index.find_one({}, {"_id":False})["index"]

    doc = {
        "id": id,
        "username": username_receive,
        "title": title_receive,
        "content": content_receive,
        "time": time,
    }

    id += 1
    db.index.update_one({}, {"$set": {"index": id}})

    print(doc)
    db.poster.insert_one(doc)

    return jsonify({"success": True})