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
        self.image = None
        self.dim= None
        self.x_start=None
        self.x_end=None
        self.y_start=None
        self.y_end= None
        self.cropped_phase =None
        self.cropped_mag=None
        if path is not None:
            self.image = self.RGB2Gray()
            fft2 = np.fft.fft2(self.image)
            fft2 = np.fft.fftshift(fft2)
            self.phase = np.exp(1j * np.angle(fft2))
            self.mag = np.abs(fft2)


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
        
    def image_fft(self):
        fft2 = np.fft.fft2(self.image)
        fft2 = np.fft.fftshift(fft2)
        self.phase = np.exp(1j * np.angle(fft2))
        self.mag = np.abs(fft2)

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
        self.image= image

    def get_length(self):
        return len(self.image)
    
    @staticmethod
    def  image_write(out_path , image):
        return cv2.imwrite(out_path,image)
    

