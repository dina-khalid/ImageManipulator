import numpy as np
import cv2


class Image():
    """
        A class used to represent the image
        ...
        Attributes
        ----------
        path : string
            the path of the image 
        image : 2D array
            2D array represents the grayscale of the image
        image_dimensions : dictionary
            dictionary represents the dimentions of the image, start crop location (x,y), cropped width and highet, total width and height
        phase : 2D array
            the phase of the grayscale of the image
        mag : 2D array
            the magnitude of the grayscale of the image
        x_start : string
            start of horizontal cropping position
        x_end : string
            end of horizontal cropping position
        y_start : string
            start of vertical cropping position
        y_end : string
            end of vertical cropping position


         Methods
        -------
        set_path(path)
            set the path of the image
        calc_dim()
            calculate dimentions of the cropped image
        RGB2Gray()
            convert RGB image to Gray scale
        crop(image, fill_value)
            fill values of the cropped part with uniform value
        mag_phase_mix(mag_img, out_path)
            mix the phase of the image with the magnitude of another
        mix_with_uniform_mag(out_path)
            mix phase of image with uniform magnitude
        mix_with_uniform_phase(out_path)
            mix magnitude of image with uniform phase
    """

    def __init__(self, path=None):
        """
        Initiate Image Object
        set values of class attributes

        Parameters
        ----------
        path : string
            the path of the image   
        """

        self.path = path
        self.image_dimensions = {
            'total_width': None,
            'total_height': None,
            'crop_width': None,
            'crop_height': None,
            'x': None,
            'y': None,
        }
        if path is not None:
            self.image = self.RGB2Gray()
            fft2 = np.fft.fft2(self.image)
            fft2 = np.fft.fftshift(fft2)
            self.phase = np.exp(1j * np.angle(fft2))
            self.mag = np.abs(fft2)

        else:
            self.image = None



    def set_path(self, path):
        """
        Set the path, phase and magnitude of the image

        Parameters
        ----------
        self : Image
            Object of the class
        path : string
            the path of the image   
        """
        self.path = path
        self.image = self.RGB2Gray()
        fft2 = np.fft.fft2(self.image)
        fft2 = np.fft.fftshift(fft2)
        self.phase = np.exp(1j * np.angle(fft2))
        self.mag = np.abs(fft2)



    def calc_dim(self):
        '''
        Calculate and set the dimentions of the image

        Parameters
        ----------
        self : Image
            Object of the class
        '''
        self.dim = len(self.image)
        self.x_start = (
            self.image_dimensions['x']/self.image_dimensions['total_width'])*self.dim
        self.x_end = ((self.image_dimensions['x']+self.image_dimensions['crop_width']
                       )/self.image_dimensions['total_width'])*self.dim
        self.y_start = (
            self.image_dimensions['y']/self.image_dimensions['total_height'])*self.dim
        self.y_end = ((self.image_dimensions['y']+self.image_dimensions['crop_height']
                       )/self.image_dimensions['total_height'])*self.dim
        self.crop(1)



    def RGB2Gray(self):
        '''
        Convert RGB image to grayscale
        Parameters
        ----------
        self : Image
            Object of the class
        '''
        image = cv2.imread(self.path, cv2.IMREAD_UNCHANGED)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return image



    def mag_phase_mix(self, mag_img, out_path):
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
        combined = np.multiply(mag_img, self.cropped_phase)
        combined_img = np.real(np.fft.ifft2(np.fft.ifftshift(combined)))
        return cv2.imwrite(out_path, combined_img)

        

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
        phase_img = self.cropped_phase
        combined = np.multiply(np.abs(np.ones(phase_img.shape)),phase_img)
        phase_only = np.real(np.fft.ifft2(np.fft.ifftshift(combined))*100 )
        cv2.imwrite(out_path, phase_only)



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
        combined = np.multiply(self.cropped_mag, np.exp(1j * np.angle(np.zeros(self.cropped_mag.shape))))
        mag_only = np.real(np.fft.ifft2(np.fft.ifftshift(combined)))
        return cv2.imwrite(out_path, mag_only)



    def crop(self,  fill_value):
        """
        Fill values of the cropped part with uniform value

        Parameters
        ----------
        fill_value : float
            Value to be filled in cropped area
        """
        self.cropped_phase = self.phase.copy()
        self.cropped_mag = self.mag.copy()
        for i in range(self.dim):
            for j in range(self.dim):
                if (self.x_start < j < self.x_end) and (self.y_start < i < self.y_end):
                    pass
                else:
                    self.cropped_phase[i][j] = fill_value
                    self.cropped_mag[i][j] = fill_value


