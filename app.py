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
        out_path = 'src/cat.jpeg'



        if obj['image2'] == None:
            phase_img = RGB2Gray(str(obj['image1']))
            x_start,x_end, y_start, y_end = calc_dim(obj1['x'],obj1['y'], obj1['total_width'],obj1['total_height'], obj1['crop_width'], obj1['crop_height'],len(phase_img))
            mix_with_uniform_mag(phase_img,out_path,x_start,x_end, y_start, y_end)

        elif obj['image1'] == None:
            mag_img = RGB2Gray(str(obj['image2']))
            x_start,x_end, y_start, y_end = calc_dim(obj2['x'],obj2['y'], obj2['total_width'],obj2['total_height'], obj2['crop_width'], obj2['crop_height'],len(mag_img))

            mix_with_uniform_phase(mag_img,out_path,x_start,x_end, y_start, y_end)

        else:
            phase_img = RGB2Gray(str(obj['image1']))
            mag_img = RGB2Gray(str(obj['image2']))
            x1_start,x1_end, y1_start, y1_end = calc_dim(obj1['x'],obj1['y'], obj1['total_width'],obj1['total_height'], obj1['crop_width'], obj1['crop_height'],len(mag_img))
            x2_start,x2_end, y2_start, y2_end = calc_dim(obj2['x'],obj2['y'], obj2['total_width'],obj2['total_height'], obj2['crop_width'], obj2['crop_height'],len(mag_img))
            mag_phase_mix(phase_img, mag_img, out_path,x1_start,x1_end, y1_start, y1_end,x2_start,x2_end, y2_start, y2_end)

        return request.data


# Running app
if __name__ == '__main__':
    app.run(debug=True)
