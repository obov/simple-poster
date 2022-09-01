from flask import Blueprint, render_template, jsonify, request
from pymongo import MongoClient
from dotenv import load_dotenv

import datetime
import os
import jwt


load_dotenv()
URL = os.environ.get("MongoDB_URL")
KEY = os.environ.get("SECRET_KEY")

client = MongoClient(URL, tls=True, tlsAllowInvalidCertificates=True) 
db = client.simple_poster

poster_bp = Blueprint("poster", __name__)


@poster_bp.route("/")
def poster():
    id = int(request.args["id"]) 
    post = db.poster.find_one({"id": id}, {"_id": False})
    title = post["title"]
    username = post["username"]
    time = post["time"]
    content = post["content"]
    return render_template("poster.html", title=title, username=username, time=time, content=content)


@poster_bp.route("/write", methods=["GET","POST"])
def post_write():
    if request.method == "GET":
        return render_template("new_poster.html")
    else:
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
        db.poster.insert_one(doc)

        return jsonify({"success": True})

    # token = request.cookies.get("logintoke")
    # if token is not None:
    #     return render_template("new_poster.html")
    # else:
    #     return render_template("login.html")


@poster_bp.route('/list',methods=['GET'])
def get_list():
    posters = list(db.poster.find({},{"_id":False}))
    posters.reverse()
    return jsonify({"data":posters})


@poster_bp.route("/edit",methods=['GET','POST'])
def edit():
    if request.method == "GET" : 
        id = int(request.args["id"])
        post = db.poster.find_one({"id": id}, {"_id": False})
        title = post["title"]
        content = post["content"]
        return render_template("edit.html",title=title,content=content)
    else:
        id = int(request.form.get("id"))
        title = request.form.get("title")
        content = request.form.get("content")
        time = str(datetime.datetime.now()).split(".")[0]
        doc = {
            "title": title,
            "content": content,
            "time": time,
        }
        try :
            post = db.poster.update_one({"id": id},{"$set": doc} )
            return {"msg": "success"}
        except:
            return {"msg":f"poster no {id} may not be updated."}
        

@poster_bp.route("/delete",methods=['POST'])
def delete():
    id = int(request.form.get("id"))
    db.poster.delete_one({"id": id})
    return {"msg":"success"}