import { useRef, useMemo, useState, useEffect, forwardRef, lazy, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Reduced particle count for better performance
  const particlesCount = 800;
  
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
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
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

const Background3D = forwardRef<HTMLDivElement>((_, ref) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    // Defer 3D rendering for better LCP
    const timer = setTimeout(() => {
      if (!mediaQuery.matches) {
        setShouldRender(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render 3D for users who prefer reduced motion or before timeout
  if (isReducedMotion || !shouldRender) {
    return (
      <div 
        ref={ref} 
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, hsla(262, 83%, 58%, 0.1) 0%, transparent 70%)",
        }}
      />
    );
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
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <ParticleField />
      </Canvas>
    </div>
  );
});

Background3D.displayName = "Background3D";

export default Background3D;