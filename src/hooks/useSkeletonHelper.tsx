import { useEffect } from "react";
import * as THREE from "three";
import { useGlobalState } from "../state/useGlobalState";

export function useSkeletonHelper(scene: THREE.Group<THREE.Object3DEventMap>) {
  const { showSkeleton } = useGlobalState();

  useEffect(() => {
    const skeletonHelper = new THREE.SkeletonHelper(scene);
    scene.add(skeletonHelper);
    skeletonHelper.visible = showSkeleton;

    return () => {
      scene.remove(skeletonHelper);
    };
  }, [scene, showSkeleton]);
}
