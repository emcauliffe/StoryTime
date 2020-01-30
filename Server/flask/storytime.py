import mysql.connector
import random
from flask import Flask, request, jsonify
app = Flask(__name__)
# app.config["DEBUG"] = True

@app.route("/")
def hello():
    return "<h1 style='color:blue'>bobby</h1>"

@app.route("/secret", methods=['GET', 'POST'])
def test():

    return jsonify([request.form, request.args])

@app.route("/requestStory", methods=['GET', 'POST'])
def newStory():
    config = {
        'user': 'storytimeuser',
        'password': '',
        'host': '127.0.0.1',
        'database': 'storytime',
        'raise_on_warnings': True
    }

    maxWords = 0
    minWords = 0

    if "password" in request.form:
        config["password"] = request.form["password"]
    else:
        return "password not present"

    if "maxWords" in request.args:
        maxWords = request.args["maxWords"]
    else:
        return "no max words"

    if "minWords" in request.args:
        minWords = request.args["minWords"]
    else:
        return "no min words"

    try:
        cnx = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            return "Something is wrong with your user name or password"
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            return "Database does not exist"
        else:
            return err
    else:

        cursor = cnx.cursor()

        cursor.execute("SELECT * FROM stories WHERE words BETWEEN %s AND %s", (minWords, maxWords))

        data = cursor.fetchall()
        cnx.close()

        randomArticle = random.randint(0, len(data)-1)

        return jsonify(data[randomArticle])



if __name__ == "__main__":
    app.run()