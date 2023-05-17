import Particles from "./Particles";
import { useGLTF, Float, OrbitControls } from "@react-three/drei";

const Experience = () => {
  const model = useGLTF("./model.gltf");

  return (
    <>
      {/* <OrbitControls /> */}

      <ambientLight intensity={0.3} />
      <directionalLight position={[2, -10, -10]} intensity={1} />

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
    </>
  );
};

export default Experience;
