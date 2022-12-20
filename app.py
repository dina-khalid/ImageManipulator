# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime

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
        RGB2Gray('image.jpeg', 'mag_image')
        RGB2Gray('image (1).jpeg', 'phase_img')
        mag_img, phase_img = resize_images('mag_image.png', 'phase_img.png')
        combined_img = mag_phase_mix(mag_img, phase_img)
        return 'Done Mix!!'
        # return combined_img


# Running app
if __name__ == '__main__':
    app.run(debug=True)
