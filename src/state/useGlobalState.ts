import { create } from "zustand";
import { BoneType } from "../types";
import { NormalizedLandmarkList } from "@mediapipe/holistic";

interface PoseData {
  za?: NormalizedLandmarkList;
  leftHandLandmarks?: NormalizedLandmarkList;
  rightHandLandmarks?: NormalizedLandmarkList;
  poseLandmarks?: NormalizedLandmarkList;
  faceLandmarks?: NormalizedLandmarkList;
}

interface EditingStore {
  opacity: number;
  setOpacity: (opacity: number) => void;
  showSkeleton: boolean;
  setShowSkeleton: (showSkeleton: boolean) => void;
  changes: number;
  makeChange: () => void;
  bones: BoneType[];
  setBones: (bones: BoneType[]) => void;
  editBone: BoneType | null;
  setEditBone: (bone: BoneType | null) => void;
  poseData: PoseData | null;
  setPoseData: (poseData: PoseData | null) => void;
}
const useGlobalState = create<EditingStore>((set) => ({
  opacity: 0.5,
  setOpacity: (opacity) => set({ opacity }),
  showSkeleton: true,
  setShowSkeleton: (showSkeleton) => set({ showSkeleton }),
  changes: 0,
  makeChange: () => set((state) => ({ changes: state.changes + 1 })),
  bones: [],
  setBones: (bones) => set({ bones }),
  editBone: null,
  setEditBone: (editBone) => set({ editBone }),
  poseData: null,
  setPoseData: (poseData) => set({ poseData }),
}));

export { useGlobalState };
