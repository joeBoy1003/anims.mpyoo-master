import { initThreeJS } from "./threeSetup.js";
import { loadModel } from "./modelLoader.js";
import { onResults2 } from "./poseEstimation.js";

const videoElement = document.getElementsByClassName("input_video")[0];
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext("2d");

function initHolistic() {
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
  });
  holistic.onResults(onResults2);

  videoElement.play();

  async function detectionFrame() {
    await holistic.send({ image: videoElement });
    videoElement.requestVideoFrameCallback(detectionFrame);
  }

  detectionFrame();
}

function init() {
  initThreeJS(videoElement);
  loadModel();
  initHolistic();
}

init();
