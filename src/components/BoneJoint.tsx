import { ThreeEvent } from "@react-three/fiber";
import { BoneType } from "../types";
import * as THREE from "three";
import { useGlobalState } from "../state/useGlobalState";

export function BoneJoint({ bone }: { bone: BoneType }) {
  const position = new THREE.Vector3();
  bone.updateMatrixWorld(true);
  bone.matrixWorld.decompose(
    position,
    new THREE.Quaternion(),
    new THREE.Vector3()
  );

  const { setEditBone } = useGlobalState();

  const onBoneClick = (e: ThreeEvent<MouseEvent>) => {
    if (
      bone.name.includes("Roll") ||
      bone.name.includes("Elbow") ||
      bone.name.includes("MH_")
    )
      return;
    e.stopPropagation();
    setEditBone(bone);
  };

  return (
    <mesh
      onClick={onBoneClick}
      key={bone.uuid}
      position={[position.x, position.y, position.z]}
    >
      <sphereGeometry args={[0.01, 24, 24]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}
