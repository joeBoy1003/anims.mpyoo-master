import {
  Affix,
  Paper,
  Stack,
  TextInput,
  ScrollArea,
  Radio,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { useGlobalState } from "../state/useGlobalState";

export function DeveloperSkeletonInfo() {
  const { editBone, bones, setEditBone } = useGlobalState();
  const [filter, setFilter] = useState<string>("");
  const filteredBones = bones.filter((bone) =>
    bone.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Affix position={{ top: 20, left: 20 }}>
      <Paper p="lg" withBorder>
        <Stack w={250}>
          <TextInput
            placeholder="Filter bone..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ScrollArea.Autosize mah={750}>
            <Stack gap="xs">
              {filteredBones.map((bone) => (
                <Radio.Card
                  p="sm"
                  onClick={() => setEditBone(bone)}
                  key={bone.uuid}
                  checked={editBone?.uuid === bone.uuid}
                >
                  <Group>
                    <Radio.Indicator />
                    {bone.name}
                  </Group>
                </Radio.Card>
              ))}
            </Stack>
          </ScrollArea.Autosize>
        </Stack>
      </Paper>
    </Affix>
  );
}
