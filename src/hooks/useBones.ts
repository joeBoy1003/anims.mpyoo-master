import { useEffect, useMemo } from "react";
import { useGlobalState } from "../state/useGlobalState";
import { BoneType } from "../types";

const useBones = (nodes: { [name: string]: BoneType }) => {
  // ! force break the memo when using TransformControls
  const { setBones, bones: globalBones } = useGlobalState();

  const bones = useMemo(() => {
    const bones = Object.values(nodes).filter((node) => node.type === "Bone");
    return bones;
  }, [nodes]);

  useEffect(() => {
    if (!globalBones || globalBones.length === 0) {
      setBones(bones);
    }
  }, [globalBones]);

  return bones;
};

export default useBones;
