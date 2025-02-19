import { Input, Slider, Stack } from "@mantine/core";
import { useGlobalState } from "../state/useGlobalState";

export function OpacitySlider() {
  const { opacity, setOpacity } = useGlobalState();

  return (
    <Stack gap={0}>
      <Input.Label>Character Visibility</Input.Label>
      <Slider
        value={opacity}
        label={(opacity * 100).toFixed(0) + "%"}
        onChange={setOpacity}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
}
