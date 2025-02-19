import { useHotkeys } from "@mantine/hooks";
import { useGlobalState } from "../state/useGlobalState";

export function useEscapeBone() {
  const { editBone, setEditBone } = useGlobalState();

  useHotkeys([
    [
      "Escape",
      () => {
        if (editBone !== null) {
          setEditBone(null);
        }
      },
    ],
  ]);
}
