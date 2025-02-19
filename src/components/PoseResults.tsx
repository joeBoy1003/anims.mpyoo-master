import { Code } from "@mantine/core";
import { useGlobalState } from "../state/useGlobalState";

export function PoseResults() {
  const { poseData } = useGlobalState();

  return (
    <Code mah={"80vh"} block>
      <pre>{JSON.stringify(poseData, null, 2)}</pre>
    </Code>
  );
}
