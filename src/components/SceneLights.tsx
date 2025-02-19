export function SceneLights() {
  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
}
