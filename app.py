from flask import Flask, render_template, jsonify
app = Flask(__name__)
@app.route('/')
def home():
    return render_template("home.html")

@app.route("/poster", methods=["POST"])
def post_submit():
    return jsonify({"msg":"success"})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)