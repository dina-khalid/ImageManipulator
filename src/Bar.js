import React from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import FlipCameraAndroidOutlinedIcon from '@mui/icons-material/FlipCameraAndroidOutlined';
import { Button } from "@mui/material";

function Bar() {
  return (
    <div style={styles.bar}>
        <Button style={styles.icon}
        startIcon={<CropOutlinedIcon style={{color:'black'}}/>}
        >
        Crop
        </Button>
        <Button style={styles.icon}
        startIcon={<FlipCameraAndroidOutlinedIcon style={{color:'black'}}/>}
        >
        Flip
        </Button>
        <Button style={styles.icon}
        // sx={{ borderRadius: 1 , backgroundColor: 'white'}}
        // variant="contained"
        startIcon={<FileDownloadOutlinedIcon style={{color:'black'}}/>}
        >
        Download
        </Button>
       
    </div>
  )
}

export default Bar

const styles = {
    bar:{
        border: '3px solid green',
        textAlign: 'center',
        color: 'white',
        fontSize: '30px',
        justifyContent: 'space-between',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width:'50%',
       
    },
    icon:{
        marginBottom:5,       
        paddingRight: '50px',
        paddingLeft: '50px',
        color:'black',
    }
}