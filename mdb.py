import pymongo
import json
from bson import json_util

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["db"]
mycol = mydb["user"]


def register(id,password):
  mydict = { "id":id, "pass": password }
  x = mycol.insert_one(mydict) 
  print(x.inserted_id)
  return "ddd"
  

def login(id,password):
  x = mycol.find_one({"id":id,"pass":password})
  json_doc = json.dumps(x, default=json_util.default)
  return json_doc