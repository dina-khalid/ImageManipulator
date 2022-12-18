import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { generateDownload } from "./utils/cropImage";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

export default function Crop({ imgId }) {
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log(croppedAreaPercentage, croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };
  const onDownload = () => {
    console.log(croppedArea);
    generateDownload(image, croppedArea);
  };
  return (
    <>
      <button style={styles.btn} onClick={onDownload}>
        Download
      </button>
      <div style={styles.container}>
        <div>
          <input
            id={imgId}
            accept="image/*"
            type="file"
            onChange={onSelectFile}
          />
        </div>

        {image && (
          <div style={styles.preview}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  btn: {
    width: 500,
  },
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
