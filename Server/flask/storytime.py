import mysql.connector
import random
from flask import Flask, request, jsonify
app = Flask(__name__)
app.config["DEBUG"] = True

@app.route("/")
def hello():
    return "<h1 style='color:blue'>StoryTime API</h1>"

@app.route("/stories/request", methods=['POST'])
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

        cursor.execute("SELECT title, author, content, id_code FROM stories WHERE words BETWEEN %s AND %s", (minWords, maxWords))

        data = cursor.fetchall()
        cnx.close()

        randomArticle = random.randint(0, len(data)-1)

        return jsonify(data[randomArticle])

@app.route("/stories/react", methods=['POST'])
def likeOrDislike():

    config = {
        'user': 'storytimeuser',
        'password': '',
        'host': '127.0.0.1',
        'database': 'storytime',
        'raise_on_warnings': True
    }

    id_code = None
    like = None

    if "password" in request.form:
        config["password"] = request.form["password"]
    else:
        return "password not present"

    if "id_code" in request.args:
        id_code = request.args["id_code"]
    else:
        return "no id code provided"

    if "like" in request.args:
        if request.args["like"] == "1":
            like = True
        elif request.args["like"] == "-1":
            like = False    
    else:
        return "no reaction provided"

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
        if like == True :
            cursor.execute("SELECT likes FROM stories WHERE id_code=%s", (id_code,))
            numberOfLikes = int(cursor.fetchall()[0][0])
            cursor.execute("UPDATE stories SET likes=%s WHERE id_code=%s", (str(numberOfLikes+1), id_code))

        elif like == False :
            cursor.execute("SELECT dislikes FROM stories WHERE id_code=%s", (id_code,))
            numberOfDislikes = int(cursor.fetchall()[0][0])
            cursor.execute("UPDATE stories SET dislikes=%s WHERE id_code=%s", (str(numberOfDislikes+1), id_code))

        cnx.commit()
        cursor.close()
        cnx.close()

        return jsonify(numberOfLikes)
        # return "aaa"

@app.route('/stories/<int:post_id>', methods=['POST'])
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id

if __name__ == "__main__":
    app.run()