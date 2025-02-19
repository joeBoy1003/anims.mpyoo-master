import type {
  OrbitControls as OrbitControlsImpl,
  TransformControls as TransformControlsImpl,
} from "three-stdlib";
import { useEffect, useRef } from "react";

export function useDragControls() {
  const transform = useRef<TransformControlsImpl>(null);
  const orbit = useRef<OrbitControlsImpl>(null);
  useEffect(() => {
    if (transform.current) {
      const { current: controls } = transform;
      const callback = (event: any) => {
        if (!orbit?.current) return;
        orbit.current.enabled = !event.value;
      };
      transform.current.addEventListener<any>("dragging-changed", callback);
      return () =>
        controls.removeEventListener<any>("dragging-changed", callback);
    }
  });
  return { transform, orbit };
}
