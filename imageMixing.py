import numpy as np
from image_processing import Image
class ImageMixing():
    def __init__(self, image1=None, image2=None):
        self.image1= image1
        self.image2= image2
        self.image = None
    
    @staticmethod
    def crop(image : Image,   fill_value):
        """
        Fill values of the cropped part with uniform value

        Parameters
        ----------
        fill_value : float
            Value to be filled in cropped area
        """
        cropped_phase = image.phase.copy()
        cropped_mag = image.mag.copy()
        for i in range(image.dim):
            for j in range(image.dim):
                if (image.x_start < j < image.x_end) and (image.y_start < i < image.y_end):
                    pass
                else:
                    cropped_phase[i][j] = fill_value
                    cropped_mag[i][j] = fill_value
        return cropped_phase , cropped_mag
    
    @staticmethod
    def calc_dim( image: Image ):
        '''
        Calculate and set the dimentions of the image

        Parameters
        ----------
        self : Image
            Object of the class
        '''
        dim = image.get_length()
        x_start = (
            image.image_dimensions['x']/image.image_dimensions['total_width'])*dim
        x_end = ((image.image_dimensions['x']+image.image_dimensions['crop_width']
                        )/image.image_dimensions['total_width'])*dim
        y_start = (
            image.image_dimensions['y']/image.image_dimensions['total_height'])*dim
        y_end = ((image.image_dimensions['y']+image.image_dimensions['crop_height']
                        )/image.image_dimensions['total_height'])*dim
        
        return dim, x_start, x_end , y_start , y_end

    def mag_phase_mix( self,out_path):
        '''
        mix the phase of the image with the magnitde of another image

        Parameters
        ----------
        self : Image
            Object of the class
        mag_img : 2D Array
            cropped_mag of another Image object
        out_path : str
            path to save the result
        '''
        combined = np.multiply(self.image2.cropped_mag, self.image1.cropped_phase)
        combined_img = np.real(np.fft.ifft2(np.fft.ifftshift(combined)))
        image= Image()
        image.image=combined_img
        return staticmethod(Image.image_write(out_path , combined_img))

    
    def mix_with_uniform_mag(self, out_path):
        '''
        mix the phase of the image with uniform magnitde

        Parameters
        ----------
        self : Image
            Object of the class
        out_path : str
            path to save the result
        '''
        phase_img = self.image1.cropped_phase
        combined = np.multiply(np.abs(np.ones(phase_img.shape)),phase_img)
        phase_only = np.real(np.fft.ifft2(np.fft.ifftshift(combined))*10000 )
        return staticmethod(Image.image_write(out_path , phase_only))



    def mix_with_uniform_phase(self, out_path):
        '''
        mix the magnitude of the image with the phase of another image

        Parameters
        ----------
        self : Image
            Object of the class
        out_path : str
            path to save the result
        '''
        combined = np.multiply(self.image2.cropped_mag, np.exp(1j * np.angle(np.zeros(self.image2.cropped_mag.shape))))
        mag_only = np.real(np.fft.ifft2(np.fft.ifftshift(combined)))
        return staticmethod(Image.image_write(out_path , mag_only))
