from flask import Flask, render_template, jsonify, request,make_response
from poster import poster_bp

app = Flask(__name__)
app.register_blueprint(poster_bp, url_prefix="/poster")

@app.route('/')
def home():
    return render_template("home.html")

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)