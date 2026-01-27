import { useRef, useMemo, useState, useEffect, forwardRef, lazy, Suspense } from "react";
import type { Points as PointsType } from "three";

// Lazy load Three.js components for better initial load performance
const ThreeCanvas = lazy(() => import("@react-three/fiber").then(mod => ({ default: mod.Canvas })));

function ParticleField() {
  const ref = useRef<PointsType>(null);
  
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

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { useFrame } = require("@react-three/fiber");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Points, PointMaterial } = require("@react-three/drei");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const THREE = require("three");

  useFrame((state: { clock: { elapsedTime: number } }) => {
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

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <ParticleField />
    </>
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
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Don't render 3D for users who prefer reduced motion
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
      <Suspense fallback={
        <div 
          className="w-full h-full"
          style={{
            background: "radial-gradient(ellipse at center, hsla(262, 83%, 58%, 0.1) 0%, transparent 70%)",
          }}
        />
      }>
        <ThreeCanvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: "transparent" }}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "low-power",
          }}
          dpr={[1, 1.5]}
          frameloop="demand"
        >
          <Scene />
        </ThreeCanvas>
      </Suspense>
    </div>
  );
});

Background3D.displayName = "Background3D";

export default Background3D;
