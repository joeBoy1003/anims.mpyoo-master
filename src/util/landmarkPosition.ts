import { NormalizedLandmark } from "@mediapipe/holistic";
import * as THREE from "three";

const landmarkPosition = (landmark: NormalizedLandmark) => {
  return new THREE.Vector3(landmark.x, landmark.y, landmark.z); // x, y, z, 000
  // ! return new THREE.Vector3(landmark.x, landmark.y, -landmark.z); // x, y, z, 001
  // ! return new THREE.Vector3(landmark.x, -landmark.y, landmark.z); // x, y, z, 010
  // ! return new THREE.Vector3(landmark.x, -landmark.y, -landmark.z); // x, y, z, 011
  // ! return new THREE.Vector3(-landmark.x, landmark.y, landmark.z); // x, y, z, 100
  // ! return new THREE.Vector3(-landmark.x, landmark.y, -landmark.z); // x, y, z, 101
  // ! return new THREE.Vector3(-landmark.x, -landmark.y, landmark.z); // x, y, z, 110
  // ! return new THREE.Vector3(-landmark.x, -landmark.y, -landmark.z); // x, y, z, 111

  // ! return new THREE.Vector3(landmark.x, landmark.z, landmark.y); // x, z, y, 000
  // ! return new THREE.Vector3(landmark.x, landmark.z, -landmark.y); // x, z, y, 001
  // ! return new THREE.Vector3(landmark.x, -landmark.z, landmark.y); // x, z, y, 010
  // ! return new THREE.Vector3(landmark.x, -landmark.z, -landmark.y); // x, z, y, 011
  // ! return new THREE.Vector3(-landmark.x, landmark.z, landmark.y); // x, z, y, 100
  // ! return new THREE.Vector3(-landmark.x, landmark.z, -landmark.y); // x, z, y, 101
  // ! return new THREE.Vector3(-landmark.x, -landmark.z, landmark.y); // x, z, y, 110
  // ! return new THREE.Vector3(-landmark.x, -landmark.z, -landmark.y); // x, z, y, 111

  // ! return new THREE.Vector3(landmark.y, landmark.x, landmark.z); // y, x, z, 000
  // ! return new THREE.Vector3(landmark.y, landmark.x, -landmark.z); // y, x, z, 001
  // ! return new THREE.Vector3(landmark.y, -landmark.x, landmark.z); // y, x, z, 010
  // ! return new THREE.Vector3(landmark.y, -landmark.x, -landmark.z); // y, x, z, 011
  // ! return new THREE.Vector3(-landmark.y, landmark.x, landmark.z); // y, x, z, 100
  // ! return new THREE.Vector3(-landmark.y, landmark.x, -landmark.z); // y, x, z, 101
  // ! return new THREE.Vector3(-landmark.y, -landmark.x, landmark.z); // y, x, z, 110
  // ! return new THREE.Vector3(-landmark.y, -landmark.x, -landmark.z); // y, x, z, 111

  // ! return new THREE.Vector3(landmark.y, landmark.z, landmark.x); // y, z, x, 000
  // ! return new THREE.Vector3(landmark.y, landmark.z, -landmark.x); // y, z, x, 001
  // ! return new THREE.Vector3(landmark.y, -landmark.z, landmark.x); // y, z, x, 010
  // ! return new THREE.Vector3(landmark.y, -landmark.z, -landmark.x); // y, z, x, 011
  // ! return new THREE.Vector3(-landmark.y, landmark.z, landmark.x); // y, z, x, 100
  // ! return new THREE.Vector3(-landmark.y, landmark.z, -landmark.x); // y, z, x, 101
  // ! return new THREE.Vector3(-landmark.y, -landmark.z, landmark.x); // y, z, x, 110
  // ! return new THREE.Vector3(-landmark.y, -landmark.z, -landmark.x); // y, z, x, 111

  // ! return new THREE.Vector3(landmark.z, landmark.x, landmark.y); // z, x, y, 000
  // ! return new THREE.Vector3(landmark.z, landmark.x, -landmark.y); // z, x, y, 001
  // ! return new THREE.Vector3(landmark.z, -landmark.x, landmark.y); // z, x, y, 010
  // ! return new THREE.Vector3(landmark.z, -landmark.x, -landmark.y); // z, x, y, 011
  // ! return new THREE.Vector3(-landmark.z, landmark.x, landmark.y); // z, x, y, 100
  // ! return new THREE.Vector3(-landmark.z, landmark.x, -landmark.y); // z, x, y, 101
  // ! return new THREE.Vector3(-landmark.z, -landmark.x, landmark.y); // z, x, y, 110
  // ! return new THREE.Vector3(-landmark.z, -landmark.x, -landmark.y); // z, x, y, 111

  // ! return new THREE.Vector3(landmark.z, landmark.y, landmark.x); // z, y, x, 000
  // ! return new THREE.Vector3(landmark.z, landmark.y, -landmark.x); // z, y, x, 001
  // ! return new THREE.Vector3(landmark.z, -landmark.y, landmark.x); // z, y, x, 010
  // ! return new THREE.Vector3(landmark.z, -landmark.y, -landmark.x); // z, y, x, 011
  // ! return new THREE.Vector3(-landmark.z, landmark.y, landmark.x); // z, y, x, 100
  // ! return new THREE.Vector3(-landmark.z, landmark.y, -landmark.x); // z, y, x, 101
  // ! return new THREE.Vector3(-landmark.z, -landmark.y, landmark.x); // z, y, x, 110
  // ! return new THREE.Vector3(-landmark.z, -landmark.y, -landmark.x); // z, y, x, 111
};

export { landmarkPosition };
