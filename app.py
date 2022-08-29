from flask import Flask, render_template, jsonify, request,make_response
from pymongo import MongoClient

client = MongoClient('URL')
db = client.simple_poster

app = Flask(__name__)
'''임시 db입니다'''
fake_db = {
    "poster": [
        {
            "id":1,"title":"All diseases run into one, old age.","content":"All diseases run into one, old age."
        },
        {
            "id":2,"title":"Alas, after a certain age every man is","content":"Alas, after a certain age every man is responsible for his face."
        },
        {
            "id":3,"title":"When grace is joined with wrinkles, it is adorable.","content":"When grace is joined with wrinkles, it is adorable. There is an unspeakable dawn in happy old age."
        },
        {
            "id":4,"title":"Age is not a particularly interesting subject.","content":"Age is not a particularly interesting subject. Any… get old. All you have to do is live long enough"
        },
        {
            "id":5,"title":"My notion of a wife at 40 is that a man should be able to change her","content":"My notion of a wife at 40 is that a man should be able to change her, like a bank note, for two 20s."
        },
        {
            "id":6,"title":"Aging seems to be the only available way ","content":"Aging seems to be the only available way to live a long life."
        },
        {
            "id":7,"title":"You know you're getting old when all the names ","content":"You know you're getting old when all the names in your black book have M. D. after them."
        },
        {
            "id":8,"title":"Middle age is youth without levity,","content":"Middle age is youth without levity, and age without decay."
        },
        {
            "id":9,"title":"The answer to old age is to keep one's mind busy","content":"The answer to old age is to keep one's mind busy a…ng a new house when he was dying of tuberculosis."
        },
        
    ]
}

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/poster/list',methods=['GET'])
def get_poster_list():
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