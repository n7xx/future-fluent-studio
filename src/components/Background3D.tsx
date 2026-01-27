import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function GlowingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="#6b21a8" transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ring2Ref.current.rotation.x = state.clock.elapsedTime * 0.08;
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} position={[-3, 1, -8]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2Ref} position={[3, -1, -6]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

import { forwardRef } from "react";

const Background3D = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <GlowingSphere />
        <FloatingRings />
      </Canvas>
    </div>
  );
});

Background3D.displayName = "Background3D";

export default Background3D;
