import numpy as np
from PIL import Image
import cv2



def resize_images(path_1,path_2):
    image_1 = cv2.imread(path_1, cv2.IMREAD_UNCHANGED)
    image_1 = cv2.cvtColor(image_1, cv2.COLOR_BGR2GRAY)


    image_2 = cv2.imread(path_2, cv2.IMREAD_UNCHANGED)
    image_2 = cv2.cvtColor(image_2, cv2.COLOR_BGR2GRAY)



    # With Pillow you can read the size property of the image
    width_1, height_1 = image_1.shape[0],image_1.shape[1]
    res_1 = width_1 * height_1
    width_2, height_2 = image_2.shape[0],image_2.shape[1]

    res_2 = width_2 * height_2
    if res_2 < res_1:
        # You need a scale factor to resize the image to res_1
        res = cv2.resize(image_2, dsize=(height_1,width_1),interpolation=cv2.INTER_LINEAR)


        # image_1.resize(width_1 * scale_factor, height_1 * scale_factor)# With Pillow you can read the size property of the image
        return image_1, res
            # You need a scale factor to resize the image to res_1
    res = cv2.resize(image_1, dsize=(height_2,width_2))

    # image_2.resize(width_2 * scale_factor, height_2 * scale_factor)# With Pillow you can read the size property of the image
    return res, image_2


        


def mag_phase_mix(mag_img,phase_img, out_path):
    f_mag = np.fft.fft2(mag_img)
    f_phase = np.fft.fft2(phase_img)
    combined = np.multiply(np.abs(f_mag), np.exp(1j * np.angle(f_phase)))
    combined_img =np.real(np.fft.ifft2(combined))
   
    return  cv2.imwrite(out_path, combined_img)