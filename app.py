# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime
from image_processing import Image
from imageMixing import ImageMixing
import numpy as np

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
image1 = Image()
image2 = Image()
imageMixer = ImageMixing(image1=image1 , image2=image2)



@app.after_request
def add_cors_headers(response):
    """
    Allow Cors for the frontend
    """
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
    """
    Initiate image attriputes when upload
    """
    if request.method == 'POST':
        a = request.get_json()

        if 'phase' in a.keys():
            phase_path = a['phase']
            image1.set_path(phase_path)
            image1.RGB2Gray()
            image1.image_fft()
            image1.image_dimensions = {
                'total_width': 0,
                'total_height': 0,
                'crop_width': 0,
                'crop_height': 0,
                'x': 0,
                'y': 0,
            }

        if 'mag' in a.keys():
            mag_path = a['mag']
            image2.set_path(mag_path)
            image2.RGB2Gray()
            image2.image_fft()
            image2.image_dimensions = {
                'total_width': 0,
                'total_height': 0,
                'crop_width': 0,
                'crop_height': 0,
                'x': 0,
                'y': 0,
            }

        return request.data


@app.route('/process2', methods=['GET', 'POST'])
def crop():
    """
    Mix the images according to the selected area
    """
    if request.method == 'POST':
        a = request.get_json()
        if 'phase' in a.keys():
            image1.image_dimensions['total_width'] = a['phase']['img_width']
            image1.image_dimensions['total_height'] = a['phase']['img_height']
            image1.image_dimensions['crop_width'] = a['phase']['cropped_width']
            image1.image_dimensions['crop_height'] = a['phase']['cropped_height']
            image1.image_dimensions['x'] = a['phase']['x']
            image1.image_dimensions['y'] = a['phase']['y']
            image1.dim, image1.x_start, image1.x_end , image1.y_start , image1.y_end= imageMixer.calc_dim(image1)
            image1.cropped_phase , image1.cropped_mag =imageMixer.crop(image1 , 1)
            # image1.crop(1)
        else:
            image2.image_dimensions['total_width'] = a['mag']['img_width']
            image2.image_dimensions['total_height'] = a['mag']['img_height']
            image2.image_dimensions['crop_width'] = a['mag']['cropped_width']
            image2.image_dimensions['crop_height'] = a['mag']['cropped_height']
            image2.image_dimensions['x'] = a['mag']['x']
            image2.image_dimensions['y'] = a['mag']['y']
            image2.dim, image2.x_start, image2.x_end , image2.y_start , image2.y_end= imageMixer.calc_dim(image2)
            image2.cropped_phase , image2.cropped_mag =imageMixer.crop(image2 , 1)
        print(np.exp(1j * np.angle(0)))
        out_path = 'src/cat.jpeg'
        if image2.path == None or image2.image_dimensions['crop_width'] == 0 or image2.image_dimensions['crop_height'] == 0:
            print(image1.image_dimensions, image2.image_dimensions)
            imageMixer.mix_with_uniform_mag(out_path=out_path)
            # image1.mix_with_uniform_mag(out_path)
        elif image1.path == None or image1.image_dimensions['crop_width'] == 0 or image1.image_dimensions['crop_height'] == 0:
            imageMixer.mix_with_uniform_phase(out_path)
        else:
            imageMixer.mag_phase_mix(out_path)
        return request.data


# Running app
if __name__ == '__main__':
    app.run(debug=True)
