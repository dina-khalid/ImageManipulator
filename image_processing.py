import numpy as np
from PIL import Image
import cv2


def calc_dim(x,y,w,h,c_w,c_h,dim):
    x_start = (x/w)*dim
    x_end = ((x+c_w)/w)*dim
    y_start = (y/h)*dim
    y_end = ((y+c_h)/h)*dim

    return x_start,x_end, y_start, y_end

def RGB2Gray(path):
    image = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return image


def mag_phase_mix(phase_img, mag_img, out_path,x1_start,x1_end, y1_start, y1_end,x2_start,x2_end, y2_start, y2_end):

    f_mag = np.fft.fft2(mag_img)
    dim = len(f_mag)
    crop(x2_start,x2_end, y2_start, y2_end, dim, f_mag)

    f_phase = np.fft.fft2(phase_img)
    crop(x1_start,x1_end, y1_start, y1_end, dim, f_phase)


    combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(f_phase)))
    combined_img = np.real(np.fft.ifft2(combined))
    return cv2.imwrite(out_path, combined_img)


def mix_with_uniform_mag(phase_img,out_path,x_start,x_end, y_start, y_end):
    f_phase = np.fft.fft2(phase_img)
    dim = len(f_phase)
    crop(x_start,x_end, y_start, y_end, dim, f_phase)
    combined = np.multiply(np.ones(f_phase.shape)*255, np.exp(1j * np.angle(f_phase)))

    phase_only = np.real(np.fft.ifft2(combined))
    return cv2.imwrite(out_path, phase_only)


def mix_with_uniform_phase(mag_img,out_path,x_start,x_end, y_start, y_end):
    f_mag = np.fft.fft2(mag_img)
    dim = len(f_mag)
    crop(x_start,x_end, y_start, y_end, dim, f_mag)
    mag_only = np.real(np.fft.ifft2(np.abs(f_mag)))

    return cv2.imwrite(out_path, mag_only)


def crop(x_start,x_end, y_start, y_end, dim, img):
    for i in range(dim):
        for j in range(dim):
            if (i>x_start or i<x_end) and (j<y_start or j>y_end ):
                img[i][j] = 1


