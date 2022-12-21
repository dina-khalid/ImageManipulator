import React, { useState, useRef} from 'react'
import { generateDownload } from "./utils/cropImage";
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
export default function App({imgId,width, height,download,downloadAction}) {

//    refDownload?.current.actions.onCkick()
 
  
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()

  const [aspect, setAspect] = useState<number | undefined>(undefined)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      console.log()
      if(imgId=='phase'){
      axios.post("http://127.0.0.1:5000//process1",{
      phase:e.target.files[0].name
    }).then((res)=>{
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })}
    else{
      axios.post("http://127.0.0.1:5000//process1",{
      mag:e.target.files[0].name
    }).then((res)=>{
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
    }
    
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
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

  useDebounceEffect(
    async () => {
      console.log(imgRef.current?.width,imgRef.current?.height)
      console.log(completedCrop?.width,completedCrop?.height)
      console.log(completedCrop?.x,completedCrop?.y)
      const obj={
        img_width:imgRef.current?.width,
        img_height:imgRef.current?.height,
        cropped_width:completedCrop?.width,
        cropped_height:completedCrop?.height,
        x:completedCrop?.x,
        y:completedCrop?.y
      }
      if(imgId=='phase'){
      axios.post("http://127.0.0.1:5000//process2",{
        phase:obj
      }).then((res)=>{
        console.log(res)
      })}
      else
      {
      axios.post("http://127.0.0.1:5000//process2",{
        mag:obj
      }).then((res)=>{
        console.log(res)
      })}
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
    },
    100,
    [completedCrop],
  )

   async function onDownload(){
    
    if(completedCrop != undefined){ 

      var xratio=(imgRef?.current?.naturalWidth)
      let x=(imgRef?.current?.width)
      //@ts-ignore
      let rex=xratio/x
      let yratio=(imgRef?.current?.naturalHeight)
      let y=(imgRef?.current?.height)
      //@ts-ignore
      let rey=yratio/y
      let crp={
      width:previewCanvasRef?.current?.width,
      height:previewCanvasRef?.current?.height,
      x:completedCrop?.x*rex,
      y:completedCrop?.y*rey
    }
    // console.log(crp)
    generateDownload(imgRef.current?.src, crp);
  }}
  if(download){
    onDownload();
    download = false;
  } 
  return (
    <div className="App">
      <div className="Crop-Controls">
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
            
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div>
        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
      </div>
    </div>
  )
}
