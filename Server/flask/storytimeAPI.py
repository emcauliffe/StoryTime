from flask import Flask, request, jsonify
app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/")
def hello():
    return "<h1 style='color:blue'>bobby</h1>"

@app.route("/secret", methods=['GET', 'POST'])
def test():

    return jsonify([request.form, request.args])

if __name__ == "__main__":
    app.run()
