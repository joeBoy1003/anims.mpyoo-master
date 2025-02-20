import { OrbitControls, TransformControls, useGLTF } from "@react-three/drei";
import { useGlobalState } from "../state/useGlobalState";
import useBones from "../hooks/useBones";
import { BoneJoint } from "./BoneJoint";
import { landmarkPosition } from "../util/landmarkPosition";
import { useEscapeBone } from "../hooks/useEscapeBone";
import { useSkeletonHelper } from "../hooks/useSkeletonHelper";
import { useOpacity } from "../hooks/useOpacity";
import { useDragControls } from "../hooks/useTransformControls";
import * as THREE from "three";
import { boneMapping } from "../util/boneMapping";
import { useEffect } from "react";
import { setupIK } from "../util/ikSolver";
import { useFrame } from "@react-three/fiber";

const modelPath = "/models/gtamale.glb";

type NormalizedLandmark = { x: number; y: number; z: number };

type PoseData = {
  za: NormalizedLandmark[];
};

function applyPoseToModel(model: THREE.Object3D, poseData: PoseData) {
  if (!poseData?.za) return;

  const landmarks = poseData.za;
  const skinnedMesh = model.children[0];
  if (!(skinnedMesh instanceof THREE.SkinnedMesh) || !skinnedMesh.skeleton) {
    console.error("No valid skeleton found on model.");
    return;
  }

  const bones = skinnedMesh.skeleton.bones;

  Object.keys(boneMapping).forEach((boneKey) => {
    const mapping = boneMapping[boneKey as keyof typeof boneMapping];
    const bone = bones[mapping.boneIndex];
    if (!bone) return;

    const landmarkA = landmarks[mapping.landmarkA];
    const landmarkB = landmarks[mapping.landmarkB];
    if (!landmarkA || !landmarkB) return;

    const scaleFactor = 1.8; // Adjusted scale for better accuracy
    const posA = new THREE.Vector3(
      (landmarkA.x - 0.5) * scaleFactor,
      (0.5 - landmarkA.y) * scaleFactor,
      (landmarkA.z ?? 0) * scaleFactor
    );
    const posB = new THREE.Vector3(
      (landmarkB.x - 0.5) * scaleFactor,
      (0.5 - landmarkB.y) * scaleFactor,
      (landmarkB.z ?? 0) * scaleFactor
    );

    const targetDir = new THREE.Vector3().subVectors(posB, posA).normalize();
    const restDir = bone.userData.restDirection || new THREE.Vector3(0, 1, 0);
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(restDir, targetDir);

    bone.quaternion.slerp(targetQuat, 0);
  });
}

function GTAModel() {
  const { editBone, makeChange, poseData, showSkeleton } = useGlobalState();
  const { transform, orbit } = useDragControls();
  const { scene, nodes } = useGLTF(modelPath);
  const bones = useBones(nodes);
  useSkeletonHelper(scene);
  useOpacity(scene);
  useEscapeBone();

  useEffect(() => {
    if (!scene) return;
    const skinnedMesh = scene.children[0];
    if (!(skinnedMesh instanceof THREE.SkinnedMesh) || !skinnedMesh.skeleton) return;
    
    skinnedMesh.skeleton.bones.forEach((bone) => {
      if (!bone.userData.restDirection && bone.children.length > 0) {
        const restDir = bone.children[0].position.clone().normalize();
        bone.userData.restDirection = restDir;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (poseData?.za && scene) {
      applyPoseToModel(scene, poseData as PoseData);
    }
  }, [poseData, scene]);

  useEffect(() => {
    if (!scene) return;
    const ikSolver = setupIK(scene);
    if (ikSolver) {
      useFrame(() => {
        ikSolver.update();
      });
    }
  }, [scene]);

  return (
    <>
      <group>
        <primitive object={scene} />
        {showSkeleton && bones.map((bone) => <BoneJoint bone={bone} key={bone.uuid} />)}
      </group>
      {editBone && (
        <TransformControls
          mode="rotate"
          ref={transform}
          object={editBone}
          onObjectChange={() => makeChange()}
          size={0.3}
        />
      )}
      {poseData?.za?.map((landmark, i) => (
        <mesh key={`za-${i}`} position={landmarkPosition(landmark as NormalizedLandmark)}>
          <sphereGeometry args={[0.01, 24, 24]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      ))}
      <OrbitControls ref={orbit} />
    </>
  );
}

export default GTAModel;
