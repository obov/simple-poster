from flask import Flask, render_template, jsonify, request,make_response
from pymongo import MongoClient
from fakedb import fake_db # 임시 db파일 입니다
import time
import datetime
client = MongoClient('URL')
db = client.simple_poster

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("home.html")

@app.route('/poster/list',methods=['GET'])
def get_poster_list():
    time.sleep(3)
    return jsonify({"data":fake_db["poster"]})

@app.route("/poster")
def poster():
    return render_template("poster.html")
        

@app.route("/post_write")
def post_write():
    return render_template("new_poster.html")


@app.route("/poster/view", methods=["GET"])
def post_view():
        ## validator
    id = request.args["id"]
    print(id)
    # post = db.poster.find_one({"id":id})
    return jsonify({"msg":"success"})


@app.route("/poster/submit", methods=["POST"])
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




if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)