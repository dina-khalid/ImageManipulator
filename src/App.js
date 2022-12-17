// App.js
// Kindacode.com
import { useState } from "react";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

export let magValue, phaseValue ='';

const App = ({imgId}) => {
  const [selectedImage, setSelectedImage] = useState();
  // const [magimageUrl, setMagImageUrl] = useState("");
  // const [phaseimageUrl, setPhaseImageUrl] = useState("");

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0])
      let value = URL.createObjectURL(e.target.files[0]);
      console.log(value)
      if(imgId==='mag'){
        magValue=value;
        // setMagImageUrl(magValue);
        console.log('mag'+magValue)
      }
      else{
        phaseValue= value;
        // setPhaseImageUrl(phaseValue);
        console.log('Phase'+phaseValue)
      }     
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
      <div style={styles.container}>
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
        {/* the upload with an icon but it has a small problem in funcionality.. DON'T DELETE PLEASE */}
        {/* <div>
          <label htmlFor="myInput"><FileUploadOutlinedIcon style={{ color:'white', fontSize: '30px'}} /></label>
          <input
            id="myInput"
            style={{display:'none'}}
            accept="image/*"
            type="file"
            onChange={imageChange}
          />
        </div> */}
        {selectedImage && (
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(selectedImage)}
              style={styles.image}
              alt="Thumb"
            />
            {/* the remove button .. DON'T DELETE PLEASE */}
            {/* <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button> */}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
// Just some styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};