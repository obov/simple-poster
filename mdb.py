import json
import os
import pymongo

from bson import json_util
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()
URL = os.environ.get("MongoDB_URL")

client = pymongo.MongoClient(URL, tls=True, tlsAllowInvalidCertificates=True) 
db = client.simple_poster
user_bp = Blueprint("user", __name__)


@user_bp.route("/signup", methods=["POST"])
def register():
  username_receive = request.form["username"]
  password_receive = request.form["password"]
  
  ## 비밀번호를 여기서 한번 암호화해줘야해요

  doc = {
    "username": username_receive,
    "password": password_receive
  }
  db.user.insert_one(doc)
  
  return jsonify({"msg": "success"})
  

@user_bp.route("/login", methods=["POST"])
def login():
  username_receive = request.form["username"]
  password_receive = request.form["password"]
  
  ## 회원가입과 마찬가지로 여기도 비밀번호를 암호화

  x = db.user.find_one({"username": username_receive, "password": password_receive}, {"_id": False})
  
  return jsonify({"msg":"success"}) 