import { OrbitControls, TransformControls, useGLTF } from "@react-three/drei";
import { useGlobalState } from "../state/useGlobalState";
import useBones from "../hooks/useBones";
import { BoneJoint } from "./BoneJoint";
import { landmarkPosition } from "../util/landmarkPosition";
import { useEscapeBone } from "../hooks/useEscapeBone";
import { useSkeletonHelper } from "../hooks/useSkeletonHelper";
import { useOpacity } from "../hooks/useOpacity";
import { useDragControls } from "../hooks/useTransformControls";

const modelPath = "/models/gtamale.glb";

function GTAModel() {
  const { editBone, makeChange, poseData, showSkeleton } = useGlobalState();
  const { transform, orbit } = useDragControls();
  const { scene, nodes } = useGLTF(modelPath);
  const bones = useBones(nodes);
  useSkeletonHelper(scene);
  useOpacity(scene);
  useEscapeBone();

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
          // onMouseDown={() => console.log("change start")}
          // onMouseUp={() => console.log("change end")}
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
