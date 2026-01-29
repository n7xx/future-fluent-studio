import { useRef, useMemo, forwardRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Reduced particles for better performance
  const particlesCount = 400;
  
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
      ref.current.rotation.x = state.clock.elapsedTime * 0.015;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const Background3D = forwardRef<HTMLDivElement>((_, ref) => {
  const [shouldRender, setShouldRender] = useState(false);

  // Defer 3D rendering until after main content is painted
  useEffect(() => {
    const timer = requestIdleCallback 
      ? requestIdleCallback(() => setShouldRender(true), { timeout: 2000 })
      : setTimeout(() => setShouldRender(true), 100);
    
    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(timer as number);
      } else {
        clearTimeout(timer as unknown as number);
      }
    };
  }, []);

  if (!shouldRender) {
    return <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
  }

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "low-power",
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <ParticleField />
      </Canvas>
    </div>
  );
});

Background3D.displayName = "Background3D";

export default Background3D;
