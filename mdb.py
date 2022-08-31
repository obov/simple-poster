
import json
import os

from bson import json_util
from pymongo import MongoClient
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()
URL = os.environ.get("MongoDB_URL")

client = MongoClient(URL, tls=True, tlsAllowInvalidCertificates=True)
db = client.simple_poster
# mydb = client["simple_poster"]
# mycol = mydb["user"]

user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def register():
  id = request.form["id"]
  password = request.form["password"]

  mydict = {
    "username": id,
    "password": password
  }
  db.user.insert_one(mydict)

  return jsonify({"msg": "success"})

#123
#qwe


@user_bp.route("/login", methods=["POST"])
def login():
  username = request.form["username"]
  password = request.form["password"]
  print("!!!!!")

  user = db.user.find_one({"username": username, "password": password}, {"_id": False})
  print(user)

  if user is not None:
    return jsonify({"msg": "success"})
  else:
    return jsonify({"msg": "fail"})
