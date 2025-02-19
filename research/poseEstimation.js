import * as THREE from "three";
import { CCDIKSolver } from "../node_modules/three/examples/jsm/animation/CCDIKSolver.js";
import { SkinnedMesh } from "three";
import { physics, camera_world, stats } from "./threeSetup.js";
import { skeleton } from "./modelLoader.js";

export function computeR(A, B) {
  // ...existing code...
}

export function update3dpose(camera, dist_from_cam, offset, poseLandmarks) {
  // ...existing code...
}

export async function rigSkeleton(skeleton, pos_3d_landmarks) {
  // ...existing code...
}

export function onResults2(results) {
  if (!results.poseLandmarks) {
    return;
  }

  const skinnedMesh = new SkinnedMesh();
  skinnedMesh.bind(skeleton);
  physics.addMesh(skinnedMesh, 1);

  const rightArmIks = [
    // ...existing code...
  ];
  const leftArmIks = [
    // ...existing code...
  ];
  const rightLegIks = [
    // ...existing code...
  ];
  const leftLegIks = [
    // ...existing code...
  ];
  const bodyIks = [
    // ...existing code...
  ];

  let rightArmIkSolver = new CCDIKSolver(skinnedMesh, rightArmIks);
  let leftArmIKSolver = new CCDIKSolver(skinnedMesh, leftArmIks);
  let rightLegIkSolver = new CCDIKSolver(skinnedMesh, rightLegIks);
  let leftLegIKSolver = new CCDIKSolver(skinnedMesh, leftLegIks);
  let bodyIKSolver = new CCDIKSolver(skinnedMesh, bodyIks);

  // ...existing code...

  (async () => {
    await rigSkeleton(skeleton, pos_3d_landmarks);

    rightArmIkSolver.update();
    leftArmIKSolver.update();
    rightLegIkSolver.update();
    leftLegIKSolver.update();
    bodyIKSolver.update();
  })();

  stats.update();
}
