import numpy as np
from PIL import Image
import cv2
import matplotlib.pyplot as plt


class Image():
    def __init__(self, path = None):
         
        self.image_dimensions = {
        'total_width': None,
        'total_height': None,
        'crop_width': None,
        'crop_height': None,
        'x': None,
        'y': None,
    }   
        if path not None:
            self.image = self.RGB2Gray(path)
        else:
            self.image = None
    

    def calc_dim(self):
        self.dim = len(self.image_fft2)
        self.x_start = (self.image_dimensions['x']/self.image_dimensions['total_width'])*self.dim
        self.x_end = ((self.image_dimensions['x']+self.image_dimensions['crop_width'])/self.image_dimensions['total_width'])*self.dim
        self.y_start = (self.image_dimensions['y']/self.image_dimensions['total_height'])*self.dim
        self.y_end = ((self.image_dimensions['y']+self.image_dimensions['crop_height'])/self.image_dimensions['total_height'])*self.dim


    def set_image_dimensions(img_width,img_height, cropped_width, cropped_height, x, y):
        self.image_dimensions['total_width'] = img_width
        self.image_dimensions['total_height'] = img_height
        self.image_dimensions['crop_width'] = cropped_width
        self.image_dimensions['crop_height'] = cropped_height
        self.image_dimensions['x'] = x
        self.image_dimensions['y'] = y


    def RGB2Gray(path):
        image = cv2.imread(path, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return image


    def mag_phase_mix(phase_img, mag_img, out_path):
        mag_img = self.image.copy()
        crop(mag_img, 0)
        f_mag = np.fft.fft2(mag_img)
        crop(mag_img, 0)
        f_phase = np.fft.fft2(phase_img)
        combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(f_phase)))
        combined_img = np.real(np.fft.ifft2(combined))
        return cv2.imwrite(out_path, combined_img)



# def mag_phase_mix(phase_img, mag_img, out_path,x1_start,x1_end, y1_start, y1_end,x2_start,x2_end, y2_start, y2_end):

#     dim = len(mag_img)
#     crop(self.x2_start,self.x2_end, self.y2_start, self.y2_end, dim, mag_img,0)
#     f_mag = np.fft.fft2(mag_img)

#     crop(self.x1_start,self.x1_end, self.y1_start, self.y1_end, dim, phase_img,0)
#     f_phase = np.fft.fft2(phase_img)


#     combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(f_phase)))
#     combined_img = np.real(np.fft.ifft2(combined))
#     return cv2.imwrite(out_path, combined_img)

    def mix_with_uniform_mag(phase_img,out_path):
        phase_image = self.image.copy()
        crop(phase_img,0)
        f_phase = np.fft.fft2(phase_img)
        combined = np.multiply(np.abs(np.ones(f_phase.shape)), np.exp(1j * np.angle(f_phase)))
        phase_only = np.real(np.fft.ifft2(combined))
        cv2.imwrite(out_path, phase_only*10000)
        return phase_only

    def mix_with_uniform_phase(out_path):
        mag_img = self.image.copy()
        crop(mag_img,10)
        f_mag = np.fft.fft2(mag_img)
        combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(np.zeros(f_mag.shape))))
        mag_only = np.real(np.fft.ifft2(combined))
        return cv2.imwrite(out_path, mag_only)


def crop(image, fill_value):
    for i in range(self.dim):
        for j in range(self.dim):
            if (self.x_start<j<self.x_end) and (self.y_start< i<self.y_end ):
                pass
            else:
                image[i][j] = fill_value


