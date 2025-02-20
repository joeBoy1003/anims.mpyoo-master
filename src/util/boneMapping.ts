export const boneMapping = {
  // Adjust boneIndex and landmark indices based on your model and Mediapipe output.
  // Here, 11 might represent left_shoulder, 13 left_elbow, etc.
  left_upper_arm: { boneIndex: 10, landmarkA: 11, landmarkB: 13 },
  left_forearm: { boneIndex: 11, landmarkA: 13, landmarkB: 15 },
  right_upper_arm: { boneIndex: 12, landmarkA: 12, landmarkB: 14 },
  right_forearm: { boneIndex: 13, landmarkA: 14, landmarkB: 16 },
  // Add additional mappings for legs, spine, head, etc.
  left_thigh: { boneIndex: 14, landmarkA: 23, landmarkB: 25 },
  left_calf: { boneIndex: 15, landmarkA: 25, landmarkB: 27 },
  right_thigh: { boneIndex: 16, landmarkA: 24, landmarkB: 26 },
  right_calf: { boneIndex: 17, landmarkA: 26, landmarkB: 28 },
  spine: { boneIndex: 18, landmarkA: 11, landmarkB: 23 },
  head: { boneIndex: 19, landmarkA: 0, landmarkB: 1 },
};
