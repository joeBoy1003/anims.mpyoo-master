import { useEffect } from "react";
import * as THREE from "three";
import { useGlobalState } from "../state/useGlobalState";

export function useOpacity(scene: THREE.Group<THREE.Object3DEventMap>) {
  const { opacity } = useGlobalState();

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material) {
        object.material.transparent = opacity < 1;
        object.material.opacity = opacity;
      }
    });
  }, [opacity]);
}
