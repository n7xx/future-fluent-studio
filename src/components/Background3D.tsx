import { useRef, useMemo, forwardRef, useState, useEffect, lazy, Suspense } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Lazy load the heavy 3D canvas
const Background3DCanvas = lazy(() => import("./Background3DCanvas"));

const Background3D = forwardRef<HTMLDivElement>((_, ref) => {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay 3D rendering until after first paint
    const timer = requestIdleCallback
      ? requestIdleCallback(() => setShouldRender(true))
      : setTimeout(() => setShouldRender(true), 1000);

    return () => {
      if (typeof timer === "number") {
        if (requestIdleCallback) cancelIdleCallback(timer);
        else clearTimeout(timer);
      }
    };
  }, []);

  // Skip 3D entirely for reduced motion users
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>
    );
  }

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {shouldRender ? (
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />}>
          <Background3DCanvas />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      )}
    </div>
  );
});

Background3D.displayName = "Background3D";

export default Background3D;
