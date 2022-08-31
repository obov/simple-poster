import os
import hashlib
import jwt

from datetime import datetime, timedelta
from pymongo import MongoClient
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv


load_dotenv()
URL = os.environ.get("MongoDB_URL")
KEY = os.environ.get("SECRET_KEY")

client = MongoClient(URL, tls=True, tlsAllowInvalidCertificates=True) 
db = client.simple_poster

user_bp = Blueprint("user", __name__)


@user_bp.route("/signup", methods=["POST"])
def register():
  username_receive = request.form["username"]
  password_receive = request.form["password"]
  
  password_hash = hashlib.sha256(password_receive.encode("utf-8")).hexdigest()

  doc = {
    "username": username_receive,
    "password": password_hash
  }
  db.user.insert_one(doc)
  
  return jsonify({"msg": "회원가입이 완료되었습니다!"})
  

@user_bp.route("/login", methods=["POST"])
def login():
  username_receive = request.form["username"]
  password_receive = request.form["password"]
  
  password_hash = hashlib.sha256(password_receive.encode("utf-8")).hexdigest()
  user = db.user.find_one({"username": username_receive, "password": password_hash}, {"_id": False})

  if user is not None:
    payload = {
      "username": username_receive,
      "exp": datetime.utcnow() + timedelta(seconds = 60*30)
    }
    token = jwt.encode(payload, KEY, algorithm="HS256") # .decode("UTF-8")
    
    return jsonify({"flag": True, "token": token})
  else:
    return jsonify({"flag": False, "msg": "아이디,비밀번호를 확인해주세요"})