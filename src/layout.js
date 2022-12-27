import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { StyleSheet, View } from "react-native";
import Crop from "./Crop";
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import { Button, ThemeProvider } from "@mui/material";
import ReactCropImage from "./ReactCropImage";
import { createTheme } from '@mui/material/styles';
import myImage from "../src/cat.jpeg";
import axios from "axios";
const styles = StyleSheet.create({
  centre: {
    margin: "auto",
    width: "100%",
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
    marginTop: "30px",
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
    borderRadius: "7px",
    backgroundColor: "#09232b",
  },
  output_box: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "35%",
    minHeight: "400px",
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

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#0f323d',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#09232b',
      },
    },
  });
  const [fixedRef,setFixedRef] =useState(false) 
  const [swapped,setSwapped] =useState(false) 
  useEffect(() => {
    document.title = "Image Mixer";
  }, []);

  return (
    <>
      <View style={[styles.margin]}></View>
      <View style={[styles.centre]}>
        <View style={styles.bar}>
          <ThemeProvider theme={theme}>
            <Button  
            variant="contained"
            color={fixedRef ? "primary" : "secondary"}
            style={styles.icon}
            startIcon={<CropOutlinedIcon />}
            onClick={()=>{
              setFixedRef(!fixedRef)
            }}>
          fixed Crop
          </Button>
        </ThemeProvider>
        <Button  
          style={styles.icon}
          startIcon={<CropOutlinedIcon />}
          onClick={()=>{
            setSwapped(!swapped)
           }}>
         Swap inputs
        </Button>
        </View>
      </View>

      <View style={[styles.margin]}></View>
      <View style={[styles.centre]}>
        <View style={[styles.container]}>
          <View style={[styles.address]}>{swapped? 'MAGNITUDE INPUT': 'PHASE INPUT'}</View>
          <View style={[styles.address]}>THE RESULT</View>
          <View style={[styles.address]}>{swapped? 'PHASE INPUT': 'MAGNITUDE INPUT'}</View>
        </View>
      </View>
              <ReactCropImage
                imgId={"mag"}
                download={downlaod}
                width={width}
                height={height}
                downloadAction={downloadAction}
                fixedRef={fixedRef}
                swapped={swapped}
              />
      </>
  );
}
