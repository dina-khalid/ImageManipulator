# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime
import os
import cv2
import matplotlib.pyplot as plt
from image_processing import *

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
obj = {
    'image1': None,
    'image2': None,
}
obj1 = {
    'total_width': None,
    'total_height': None,
    'crop_width': None,
    'crop_height': None,
    'x': None,
    'y': None,
}
obj2 = {
    'total_width': None,
    'total_height': None,
    'crop_width': None,
    'crop_height': None,
    'x': None,
    'y': None,
}


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
        path = 'C:/Users/nasse/OneDrive/Desktop/task4_ver2/ImageManipulator/src/cat.jpeg'
        img1_path = 'C:/Users/nasse/Downloads/image.jpeg'
        img2_path = 'C:/Users/nasse/Downloads/image (1).jpeg'
        mag_img, phase_img = resize_images(img1_path, img2_path)
        combined_state = mag_phase_mix(mag_img, phase_img, path)
        print(combined_state)

        if os.path.exists(img1_path):
            os.remove(img1_path)
        if os.path.exists(img2_path):
            os.remove(img2_path)
        return 'Done'


@app.route('/process1', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        a = request.get_json()

        if 'phase' in a.keys():
            image1 = a['phase']
            obj['image1'] = image1

        if 'mag' in a.keys():
            image2 = a['mag']
            obj['image2'] = image2

        print(obj)
        return request.data


@app.route('/process2', methods=['GET', 'POST'])
def crop():
    if request.method == 'POST':
        a = request.get_json()
        if 'phase' in a.keys():
            obj1['total_width'] = a['phase']['img_width']
            obj1['total_height'] = a['phase']['img_height']
            obj1['crop_width'] = a['phase']['cropped_width']
            obj1['crop_height'] = a['phase']['cropped_height']
            obj1['x'] = a['phase']['x']
            obj1['y'] = a['phase']['y']
        else:
            obj2['total_width'] = a['mag']['img_width']
            obj2['total_height'] = a['mag']['img_height']
            obj2['crop_width'] = a['mag']['cropped_width']
            obj2['crop_height'] = a['mag']['cropped_height']
            obj2['x'] = a['mag']['x']
            obj2['y'] = a['mag']['y']

        print(obj1, obj2)
        return request.data


# Running app
if __name__ == '__main__':
    app.run(debug=True)
