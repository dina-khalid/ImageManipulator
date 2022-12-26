import React, { useState, useRef } from "react";
import "./App.css";
import { StyleSheet, View } from "react-native";
import Crop from "./Crop";
import ReactCropImage from "./ReactCropImage";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CropOutlinedIcon from "@mui/icons-material/CropOutlined";
import FlipCameraAndroidOutlinedIcon from "@mui/icons-material/FlipCameraAndroidOutlined";
import { Button } from "@mui/material";
import { magValue } from "./App";
import { saveAs } from "file-saver";
import myImage from "../src/cat.jpeg";
import axios from "axios";
const styles = StyleSheet.create({
  centre: {
    margin: "auto",
    width: "90%",
  },
  bar: {
    backgroundColor: "#09232b",
    // border: "1px solid #f5e8e4",
    borderRadius: "5px",
    textAlign: "center",
    color: "white",
    fontSize: "30px",
    justifyContent: "space-between",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
  icon: {
    marginBottom: 5,
    paddingRight: "50px",
    paddingLeft: "50px",
    color: "#f5e8e4",
  },
  margin: {
    marginTop: "70px",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  address: {
    marginTop: 5,
    fontSize: "16.5px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "25%",
    minHeight: "38px",
    // border: '0.5px solid whiteSmoke',
    // backgroundColor:'#1d222a',
    color: "#f5e8e4",
  },

  input_box: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "30%",
    // border: '0.5px solid #f5e8e4',
    borderRadius: "7px",
    backgroundColor: "#09232b",
  },
  output_box: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "35%",
    minHeight: "400px",
    // border: '0.5px solid #f5e8e4',
    borderRadius: "7px",
    backgroundColor: "#09232b",
  },
});

export default function HeaderFooter() {
  const [downlaod, setDownlaod] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const downloadAction = (x) => {
    console.log("Downloading");
    setDownlaod(true);
    setTimeout(() => {
      setDownlaod(false);
    }, 200);
    setTimeout(() => {}, 200);
    axios.post("http://127.0.0.1:5000//process", {}).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <>
      <View style={[styles.margin]}></View>
      <View style={[styles.centre]}>
        <View style={styles.bar}>image mixer</View>
      </View>

      <View style={[styles.margin]}></View>
      <View style={[styles.centre]}>
        <View style={[styles.container]}>
          <View style={[styles.address]}>MAGNITUDE INPUT</View>
          <View style={[styles.address]}>THE RESULT</View>
          <View style={[styles.address]}>PHASE INPUT</View>
        </View>
      </View>
      <View style={[styles.centre]}>
        <View style={[styles.container]}>
          <View style={[styles.row]}>
            <View style={[styles.input_box]}>
              <ReactCropImage
                imgId={"mag"}
                download={downlaod}
                width={width}
                height={height}
                downloadAction={downloadAction}
              />
            </View>

            <View style={[styles.output_box]}>
              <img src={myImage} alt="output" />
            </View>
            {/* <View style={[styles.input_box]}>
              <ReactCropImage
                imgId={"phase"}
                download={downlaod}
                width={width}
                height={height}
                downloadAction={downloadAction}
              />
            </View> */}
          </View>
        </View>
      </View>
    </>
  );
}
