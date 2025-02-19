import { Checkbox } from "@mantine/core";
import { useGlobalState } from "../state/useGlobalState";

export function ShowSkeleton() {
  const { showSkeleton, setShowSkeleton, setEditBone } = useGlobalState();

  return (
    <Checkbox
      label="Show Skeleton"
      checked={showSkeleton}
      onChange={(event) => {
        setShowSkeleton(event.currentTarget.checked);
        setEditBone(null);
      }}
    />
  );
}
