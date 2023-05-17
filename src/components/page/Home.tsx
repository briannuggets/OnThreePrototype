import { Canvas } from "@react-three/fiber";
import Experience from "../three/Experience";
import Hero from "../general/Hero";
import Nav from "../general/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="canvas-container">
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-6, 0, 0],
          }}
        >
          <Experience />
        </Canvas>
      </div>
      <Hero />
    </>
  );
};

export default Home;
