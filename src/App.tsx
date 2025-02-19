import { Box, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./components/Scene";
import { theme } from "./theme";
import { DeveloperControls } from "./components/DeveloperControls";
import { DeveloperSkeletonInfo } from "./components/DeveloperSkeletonInfo";

export default function App() {
  return (
    <MantineProvider forceColorScheme="dark" theme={theme}>
      <Box h="100vh" w="100vw">
        <DeveloperSkeletonInfo />
        <DeveloperControls />
        <Canvas camera={{ position: [-2.41, 2.6, 0.14] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </Box>
    </MantineProvider>
  );
}
