import React, { useState, useRef} from 'react'
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './CanvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import myImage from "../src/cat.jpeg";
import myPhase from "../src/phase.jpeg";
import myMag from "../src/mag.jpeg";

import 'react-image-crop/dist/ReactCrop.css'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}
//@ts-ignore
export default function App({imgId,width, height,download,downloadAction, fixedRef, swapped}) {

//    refDownload?.current.actions.onCkick()
 
  
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // const [fixedRef,setFixedRef] =useState(false) 
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [imgSrc2, setImgSrc2] = useState('')
  const previewCanvasRef2 = useRef<HTMLCanvasElement>(null)
  const imgRef2 = useRef<HTMLImageElement>(null)
  const [crop2, setCrop2] = useState<Crop>()
  const [completedCrop2, setCompletedCrop2] = useState<PixelCrop>()


  const [aspect, setAspect] = useState<number | undefined>(undefined)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      axios.post("http://127.0.0.1:5000//process1",{
      phase:e.target.files[0].name
    }).then((res)=>{
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
    
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }
  function onSelectFile2(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      axios.post("http://127.0.0.1:5000//process1",{
        mag:e.target.files[0].name
      }).then((res)=>{
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
      setCrop2(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc2(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    
    
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
  function onImageLoad2(e: React.SyntheticEvent<HTMLImageElement>) {
    
    
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop2(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {

      console.log(completedCrop?.width,completedCrop?.height)
      console.log(completedCrop2?.width,completedCrop2?.height)
      let obj={
        img_width:imgRef.current?.width,
        img_height:imgRef.current?.height,
        cropped_width:completedCrop?.width,
        cropped_height:completedCrop?.height,
        x:completedCrop?.x,
        y:completedCrop?.y
      }
      let obj2={
        img_width:imgRef2.current?.width,
        img_height:imgRef2.current?.height,
        cropped_width:completedCrop2?.width,
        cropped_height:completedCrop2?.height,
        x:completedCrop2?.x,
        y:completedCrop2?.y
      }
      if(fixedRef)
      {
        obj2={
          img_width:imgRef.current?.width,
          img_height:imgRef.current?.height,
          cropped_width:completedCrop?.width,
          cropped_height:completedCrop?.height,
          x:completedCrop?.x,
          y:completedCrop?.y
        }
      }

          axios.post("http://127.0.0.1:5000//process2",{
          phase:obj,
          swap:swapped
        }).then((res)=>{
          console.log(res)
        })
  
        axios.post("http://127.0.0.1:5000//process2",{
          mag:obj2,
          swap:swapped
        }).then((res)=>{
          console.log(res)
        })
        
      

    
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
        )
        
      }
      if (
        completedCrop2?.width &&
        completedCrop2?.height &&
        imgRef2.current &&
        previewCanvasRef2.current
      ) {
        canvasPreview(
          imgRef2.current,
          previewCanvasRef2.current,
          completedCrop2,
        )
        
      }
    },
    100,
    [completedCrop,completedCrop2]
  )

  return (

    <div className="App">
    <div style={{
      display: 'flex',
      justifyContent: "space-between",
      marginBottom: 0,
    }}>
      <div style={{
         display: "block",
         marginLeft: "auto",
         marginRight: "auto",
         width: "30%",
         borderRadius: "7px",
         backgroundColor: "#09232b",
      }}>
        <div className="Crop-Controls" style={{textAlign: "center"}}>
        <label htmlFor={imgId}><FileUploadOutlinedIcon style={{color:'white', fontSize: '30px'}}/></label>
            <input
              id={imgId}
              style={{display:'none'}} type="file" accept="image/*" onChange={onSelectFile} />
        </div>

        {!!imgSrc && (
          <ReactCrop
    
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => {
              
              setCompletedCrop(c)
              
              //
            //console.log(completedCrop?.width,completedCrop?.height) 
            }}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{backgroundColor:'#0b2b34'}}
              onLoad={onImageLoad}
            />
            
          </ReactCrop>
        )}
      </div>
      <div style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "30%",
        minHeight: "400px",
        borderRadius: "7px",
        // backgroundColor: "#09232b",
      }}>
        <img src={myImage} alt="output" />
      </div>
      <div style={{
         display: "block",
         marginLeft: "auto",
         marginRight: "auto",
         width: "30%",
         borderRadius: "7px",
         backgroundColor: "#09232b",
      }}>
        <div className="Crop-Controls" style={{textAlign: "center"}}>
        <label htmlFor={"img"}><FileUploadOutlinedIcon style={{color:'white', fontSize: '30px'}}/></label>
            <input
              id={'img'}
              style={{display:'none'}} type="file" accept="image/*" onChange={onSelectFile2} />
    
        
        </div>
        {!!imgSrc2 && (
          <ReactCrop
            crop={fixedRef?crop:crop2}
            onChange={(_, percentCrop) => {
            if(fixedRef)
              setCrop(percentCrop)
            else
              {setCrop2(percentCrop)

              }}}
            onComplete={(c) => {
              if(fixedRef)
              setCompletedCrop(c)
              else{
              setCompletedCrop2(c)

            }//
            //console.log(completedCrop?.width,completedCrop?.height) 
            }}
          >
            <img
              ref={imgRef2}
              alt="Crop me"
              src={imgSrc2}
              style={{backgroundColor:'#0b2b34'}}
              onLoad={onImageLoad2}
            />
            
          </ReactCrop>
        )}
      </div>
    </div>
    </div>
  )
}

