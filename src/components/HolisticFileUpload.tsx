import { Button, FileButton } from "@mantine/core";  
import "@mantine/core/styles.css";  
import {  
  Holistic,  
  Results,  
  type NormalizedLandmarkList,  
} from "@mediapipe/holistic";  
import { useState } from "react";  
import { useGlobalState } from "../state/useGlobalState";  

const holistic = new Holistic({  
  locateFile: (file) => {  
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;  
  },  
});  

holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  enableFaceGeometry: false,
});

interface RealResults extends Results {  
  za: NormalizedLandmarkList;  
}  

holistic.onResults((results) => {  
  if (!results.poseLandmarks) {  
    console.error("Pose landmarks not found.");  
    return;  
  }  
  const rResults = results as RealResults;  
  console.timeEnd("pose detection");  
  useGlobalState.setState({ poseData: results });  
});  

export function HolisticFileUpload() {  
  const [_file, setFile] = useState<File | null>(null);  

  const onFileChange = (file: File | null) => {  
    console.time("pose detection");  
    setFile(file);  
    if (!file) return;  

    const reader = new FileReader();  
    reader.onload = (e) => {  
      const imgElement = document.createElement("img");  
      imgElement.src = e.target?.result as string;  
      imgElement.onload = () => {  
        console.log("Image loaded:", imgElement.src);  
        holistic.send({ image: imgElement });  
      };  
    };  
    reader.readAsDataURL(file);  
  };  

  return (  
    <FileButton onChange={onFileChange} accept="image/png,image/jpeg">  
      {(props) => <Button {...props}>Upload image</Button>}  
    </FileButton>  
  );  
}