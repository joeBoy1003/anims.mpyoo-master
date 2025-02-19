import * as THREE from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import { AmmoPhysics } from "../node_modules/three/examples/jsm/physics/AmmoPhysics.js";

export let physics, position, stats, renderer, camera_ar, camera_world;

export async function initThreeJS(videoElement) {
  physics = await AmmoPhysics();
  position = new THREE.Vector3();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  const render_w = videoElement.videoWidth;
  const render_h = videoElement.videoHeight;
  renderer.setSize(render_w, render_h);
  renderer.setViewport(0, 0, render_w, render_h);
  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  camera_ar = new THREE.PerspectiveCamera(45, render_w / render_h, 0.1, 1000);
  camera_ar.position.set(-1, 2, 3);
  camera_ar.up.set(0, 1, 0);
  camera_ar.lookAt(0, 1, 0);

  camera_world = new THREE.PerspectiveCamera(45, render_w / render_h, 1, 1000);
}
