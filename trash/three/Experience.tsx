import Particles from "./Particles";
import {
  useGLTF,
  Float,
  ScrollControls,
  OrbitControls,
} from "@react-three/drei";

const Experience = () => {
  const model = useGLTF("./model.gltf");

  return (
    <>
      <OrbitControls enableZoom={false} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[2, -10, -10]} intensity={1} />

      <ScrollControls pages={7} damping={0.25}>
        <Particles count={100} />
        {window.innerWidth > 1028 && (
          <Float floatIntensity={0.5}>
            <primitive
              object={model.scene}
              scale={0.5}
              rotation={[-1, 1, 0]}
              position={[0, -1, -2]}
            />
          </Float>
        )}
      </ScrollControls>
    </>
  );
};

export default Experience;
