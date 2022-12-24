import numpy as np
from PIL import Image
import cv2
import matplotlib.pyplot as plt


class Image():
    def __init__(self, path=None):
        self.path = path
        self.image_dimensions = {
            'total_width': None,
            'total_height': None,
            'crop_width': None,
            'crop_height': None,
            'x': None,
            'y': None,
        }
        print(path)
        if path is not None:
            self.image = self.RGB2Gray()
        else:
            self.image = None

    def set_path(self, path):
        self.path = path
        self.image = self.RGB2Gray()

    def calc_dim(self):
        self.dim = len(self.image)
        self.x_start = (
            self.image_dimensions['x']/self.image_dimensions['total_width'])*self.dim
        self.x_end = ((self.image_dimensions['x']+self.image_dimensions['crop_width']
                       )/self.image_dimensions['total_width'])*self.dim
        self.y_start = (
            self.image_dimensions['y']/self.image_dimensions['total_height'])*self.dim
        self.y_end = ((self.image_dimensions['y']+self.image_dimensions['crop_height']
                       )/self.image_dimensions['total_height'])*self.dim
        self.cropped = self.image.copy()
        self.crop(self.cropped, 0)

    def RGB2Gray(self):
        image = cv2.imread(self.path, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return image

    def mag_phase_mix(self, mag_img, out_path):
        f_mag = np.fft.fft2(mag_img)
        phase_img = self.cropped
        f_phase = np.fft.fft2(phase_img)
        combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(f_phase)))
        combined_img = np.real(np.fft.ifft2(combined))
        return cv2.imwrite(out_path, combined_img)

    def mix_with_uniform_mag(self, out_path):
        phase_img = self.cropped
        f_phase = np.fft.fft2(phase_img)
        combined = np.multiply(
            np.abs(np.ones(f_phase.shape)), np.exp(1j * np.angle(f_phase)))
        phase_only = np.real(np.fft.ifft2(combined)*10000)
        cv2.imwrite(out_path, phase_only)

    def mix_with_uniform_phase(self, out_path):
        mag_img = self.cropped
        f_mag = np.fft.fft2(mag_img)
        combined = np.multiply(np.abs(f_mag), np.exp(
            1j * np.angle(np.ones(f_mag.shape))))
        mag_only = np.real(np.fft.ifft2(combined))
        return cv2.imwrite(out_path, mag_only)

    def crop(self, image, fill_value):
        for i in range(self.dim):
            for j in range(self.dim):
                if (self.x_start < j < self.x_end) and (self.y_start < i < self.y_end):
                    pass
                else:
                    image[i][j] = fill_value
