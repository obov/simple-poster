from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('URL')
db = client.simple_poster


app = Flask(__name__)
@app.route('/')
def home():
    return render_template("new_poster.html")


@app.route("/poster/submit", methods=["POST"])
def post_submit():
    ## validator

    # username_receive = request.form["username_give"]
    title_receive = request.form["title_give"]
    content_receive = request.form["content_give"]
    time_receive = request.form["time_give"]

    doc = {
        # "id": id,
        # "username": username_receive,
        "title": title_receive,
        "content": content_receive,
        "time": time_receive
    }

    print(doc)
    # db.poster.insert_one()

    return jsonify({"msg":"success"})


@app.route("/poster", methods=["GET"])
def post_get():

    ## validator
    id = request.args["id"]    
    post = db.poster.find_one({"id":id})
    

    return jsonify({"msg":"success"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)