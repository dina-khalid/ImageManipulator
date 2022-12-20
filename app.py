# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime
import os

from image_processing import *

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data


@app.after_request
def add_cors_headers(response):
    r = request.referrer[:-1]

    response.headers.add('Access-Control-Allow-Origin', r)
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization')
    response.headers.add('Access-Control-Allow-Methods',
                         'GET, POST, OPTIONS, PUT, DELETE')
    return response


@app.route('/process', methods=['GET', 'POST'])
def process_image():
    if request.method == 'POST':
        print("DonePost")
        path = '/home/dina/Music/ImageManipulator/src/cat.jpeg' 
        

        mag_img, phase_img = resize_images('../image.jpeg','../image (1).jpeg')
        combined_state = mag_phase_mix(mag_img, phase_img,path)
        print(combined_state)
        img1_path = '/home/dina/image.jpeg'
        img2_path = '/home/dina/image (1).jpeg'

        if os.path.exists(img1_path):
            os.remove(img1_path)
        if os.path.exists(img2_path):
            os.remove(img2_path)
        return 'Done'


# Running app
if __name__ == '__main__':
    app.run(debug=True)
