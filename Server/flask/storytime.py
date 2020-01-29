import mysql.connector
from flask import Flask, request, jsonify
app = Flask(__name__)
# app.config["DEBUG"] = True

config = {
  'user': 'root',
  'password': '',
  'host': '127.0.0.1',
  'database': 'storytime',
  'raise_on_warnings': True
}

@app.route("/")
def hello():
    return "<h1 style='color:blue'>bobby</h1>"

@app.route("/secret", methods=['GET', 'POST'])
def test():

    return jsonify([request.form, request.args])


@app.route("/sqlTest", methods=['GET','POST'])
def access():
    if "password" in request.form:
        config["password"] = request.form["password"]
    else:
        return "password not present"

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

        cursor.execute("SELECT * FROM stories")

        data = cursor.fetchall()
        cnx.close()

        return jsonify(data)

if __name__ == "__main__":
    app.run()