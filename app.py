# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

obj = {
    'Name': "geek",
            "Age": "22",
            "Date": x,
            "programming": "python"
}
obj2 = {
    'Name': "qwqw",
            "Age": "12344",
            "Date": x,
            "programming": "python"
}
# Route for seeing a data


@app.route('/data', methods=['GET', 'POST'])
def get_time():
    if request.method == 'GET':
        return obj
    if request.method == 'POST':
        print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        return obj2


# Running app
if __name__ == '__main__':
    app.run(debug=True)
