import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export let model, skeleton;

export function loadModel() {
  const loader = new GLTFLoader();
  loader.load("../models/gltf/Jaygo.glb", function (gltf) {
    model = gltf.scene;

    let bones = [];
    model.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
      if (object.isBone) {
        bones.push(object);
      }
    });

    skeleton = new THREE.Skeleton(bones);
  });
}
