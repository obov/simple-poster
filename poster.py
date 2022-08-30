from flask import Blueprint, render_template, jsonify, request

import time
import datetime

from fakedb import fake_db # 임시 db파일 입니다

poster_bp = Blueprint("poster", __name__)


@poster_bp.route('/list',methods=['GET'])
def get_poster_list():
    time.sleep(3)
    return jsonify({"data":fake_db["poster"]})


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

    doc = {
        # "id": id,
        # "username": username_receive,
        "title": title_receive,
        "content": content_receive,
        "time": time,
    }

    print(doc)
    # db.poster.insert_one()

    return jsonify({"msg":"success"})