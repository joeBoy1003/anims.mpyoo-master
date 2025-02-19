import GTAModel from "./GTAModel";
import { SceneLights } from "./SceneLights";

export function Scene() {
  return (
    <>
      <SceneLights />
      <gridHelper args={[10, 10]} />
      <GTAModel />
    </>
  );
}
