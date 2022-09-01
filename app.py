from flask import Flask, render_template
from pymongo import MongoClient
from poster import poster_bp,db
from mdb import user_bp


app = Flask(__name__)
app.register_blueprint(poster_bp, url_prefix="/poster")
app.register_blueprint(user_bp, url_prefix="/user")


@app.route('/')
def home():
    return render_template("home.html")


@app.route('/cloak')
def cloaked():
    posters = list(db.poster.find({},{"_id":False}))
    for poster in posters : 
        poster['title_replaced'] = poster['title'].replace("'","\\'")
    posters.reverse()
        
    return render_template("home_cloaked.html",posters=posters)


@app.route("/signup")
def signup():
    return render_template("signup.html")


@app.route("/login")
def loginp():
    return render_template("login.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)