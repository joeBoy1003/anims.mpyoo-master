import { Affix, Paper, Stack } from "@mantine/core";
import { HolisticFileUpload } from "./HolisticFileUpload";
import { OpacitySlider } from "./OpacitySlider";
import { PoseResults } from "./PoseResults";
import { ShowSkeleton } from "./ShowSkeleton";

export function DeveloperControls() {
  return (
    <Affix position={{ top: 20, right: 20 }}>
      <Paper p="lg" withBorder>
        <Stack>
          <OpacitySlider />
          <ShowSkeleton />
          <HolisticFileUpload />
          <PoseResults />
        </Stack>
      </Paper>
    </Affix>
  );
}
