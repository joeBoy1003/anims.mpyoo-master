import * as THREE from "three";
import { CCDIKSolver } from "three/examples/jsm/animation/CCDIKSolver.js";
import { boneMapping } from "./boneMapping"; 

export function setupIK(model: THREE.Group) {
  const skinnedMesh = model.children[0] as THREE.SkinnedMesh;
  if (!skinnedMesh.skeleton) {
    console.error("No skeleton found on model.");
    return;
  }
  const bones = skinnedMesh.skeleton.bones;

  const iks = [
    {
      target: boneMapping.rightHand,  
      effector: boneMapping.rightLowerArm,  
      links: [{ index: boneMapping.rightUpperArm }],
      iteration: 10,
    },
    {
      target: boneMapping.leftHand,
      effector: boneMapping.leftLowerArm,
      links: [{ index: boneMapping.leftUpperArm }],
      iteration: 10,
    },
    {
      target: boneMapping.rightFoot,
      effector: boneMapping.rightLowerLeg,
      links: [{ index: boneMapping.rightUpperLeg }],
      iteration: 10,
    },
  ];

  const ikSolver = new CCDIKSolver(skinnedMesh, iks);
  return ikSolver;
}
