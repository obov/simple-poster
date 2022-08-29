from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('URL')
db = client.simple_poster


app = Flask(__name__)
@app.route('/')
def home():
    return render_template("home.html")


@app.route("/poster/submit", methods=["POST"])
def posterForm():
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




if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)