// App.js
// Kindacode.com
import { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export let magValue,
  phaseValue = "";

const App = ({ imgId }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [magimageUrl, setMagImageUrl] = useState("");
  const [phaseimageUrl, setPhaseImageUrl] = useState("");
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  // This function will be triggered when the file field change
  const imageChange = (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0]);
      let value = URL.createObjectURL(e.target.files[0]);
      console.log(value);
      if (imgId === "mag") {
        magValue = value;
        setMagImageUrl(magValue);
        console.log("mag" + magValue);
      } else {
        phaseValue = value;
        setPhaseImageUrl(phaseValue);
        console.log("Phase" + phaseValue);
      }
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    console.log(crop);
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
  };

  return (
    <>
      <div style={styles.container}>
        <div>
          <label htmlFor={imgId}>
            <FileUploadOutlinedIcon
              style={{ color: "white", fontSize: "30px" }}
            />
          </label>
          <input
            id={imgId}
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={imageChange}
          />
        </div>

        <div style={styles.preview}>
          {src && (
            <div>
              <ReactCrop
                style={styles.image}
                crop={crop}
                alt=""
                onChange={(c) => {
                  setCrop(c);
                }}
              >
                <img src={src} alt="" />
              </ReactCrop>
              <button onClick={cropImageNow}>Crop</button>
            </div>
          )}
          {/* the remove button .. DON'T DELETE PLEASE */}
          {/* <button onClick={removeSelectedImage} style={styles.delete}>
              Remove This Image
            </button> */}
        </div>
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
