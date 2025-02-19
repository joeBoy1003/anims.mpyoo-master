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

interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

interface PoseData {
  za?: Landmark[]; // Optional to prevent TypeScript errors
}

function applyPoseToModel(model: THREE.Group, poseData: PoseData | null) {
  if (!poseData || !poseData.za) return;  // Check if poseData or poseData.za is undefined

  const skinnedMesh = model.children[0] as THREE.SkinnedMesh;
  if (!skinnedMesh.skeleton) {
    console.error("No skeleton found on model.");
    return;
  }

  const bones = skinnedMesh.skeleton.bones;

  Object.keys(boneMapping).forEach((boneName) => {
    const boneIndex = boneMapping[boneName] as number | undefined;
    if (boneIndex === undefined) return;

    const bone = bones[boneIndex];
    if (!bone) return;

    const landmark = poseData.za[boneIndex];  // Landmark should be in poseData.za
    if (!landmark) return;  // Ensure landmark is not undefined

    const newPos = new THREE.Vector3(
      landmark.x * 2 - 1, // Convert from [0,1] to [-1,1]
      -landmark.y * 2 + 1,
      landmark.z * 2 - 1
    );

    bone.position.lerp(newPos, 0.5);  // Smoothly move bones
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
    if (poseData?.za && scene) {  // Check if poseData.za is defined
      applyPoseToModel(scene, poseData);
    }
  }, [poseData, scene]);

  // Initialize IK Solver only after ensuring the model is ready
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
        {showSkeleton &&
          bones.map((bone) => <BoneJoint bone={bone} key={bone.uuid} />)}
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

      {/* Preview pose results */}
      {poseData?.za?.map((landmark, i) => (
        <mesh key={`za-${i}`} position={landmarkPosition(landmark)}>
          <sphereGeometry args={[0.01, 24, 24]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      ))}
      <OrbitControls ref={orbit} />
    </>
  );
}

export default GTAModel;
