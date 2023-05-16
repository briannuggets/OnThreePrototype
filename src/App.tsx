import { Canvas } from "@react-three/fiber";
import Experience from "./components/three/Experience";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
