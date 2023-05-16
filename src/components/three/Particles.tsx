import { FC, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
// @ts-ignore
import particleFragmentShader from "./shaders/particles/frag.glsl";
// @ts-ignore
import particleVertexShader from "./shaders/particles/vert.glsl";
import { AdditiveBlending } from "three";

interface ParticlesProps {
  count: number;
}

const Particles: FC<ParticlesProps> = ({ count }) => {
  // ----- References ----- //
  const material = useRef<THREE.ShaderMaterial>(null!);
  const points = useRef<THREE.Points>(null!);

  // ----- Attributes ----- //

  // Starting position of each particle
  // Formulated to be roughly the shape of a line from bottom left to top right
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 5;
      let y = (Math.random() - 0.5) * 10 - 3;
      let z = y + (Math.random() - 0.5) * 7;
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  // Speed will be a random number between 0 and 0.1
  const particleSpeeds = useMemo(() => {
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let speed = Math.random() / 10;
      speeds.set([speed], i);
    }
    return speeds;
  }, [count]);

  // Scale of particle will be a random number between 0.3 and 0.8
  const particleScales = useMemo(() => {
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      let scale = Math.random() / 2 + 0.3;
      scales.set([scale], i);
    }
    return scales;
  }, [count]);

  // ----- Uniforms ----- //

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uSize: {
        value: 8.0,
      },
    }),
    []
  );

  // Update uTime for particle animation
  useFrame((state) => {
    const { clock } = state;
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={count}
          array={particlePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-aSpeed"}
          count={count}
          array={particleSpeeds}
          itemSize={1}
        />
        <bufferAttribute
          attach={"attributes-aScale"}
          count={count}
          array={particleScales}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={particleFragmentShader}
        vertexShader={particleVertexShader}
        uniforms={uniforms}
        ref={material}
        blending={AdditiveBlending}
      />
    </points>
  );
};

export default Particles;
