import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, hsl(270, 50%, 6%) 0%, hsl(270, 50%, 4%) 100%)",
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "hsl(262, 83%, 58%)" : "hsl(187, 94%, 48%)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with Glow */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsla(262, 83%, 58%, 0.4) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Orbiting Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-accent"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      transform: `translateX(${60 + i * 15}px) translateY(-50%)`,
                      background: i % 2 === 0 ? "hsl(262, 83%, 58%)" : "hsl(187, 94%, 48%)",
                      boxShadow: `0 0 20px ${i % 2 === 0 ? "hsl(262, 83%, 58%)" : "hsl(187, 94%, 48%)"}`,
                    }}
                  />
                </motion.div>
              ))}

              {/* Logo */}
              <motion.img
                src={logo}
                alt="4 Creative"
                className="w-32 h-32 object-contain relative z-10"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px hsla(262, 83%, 58%, 0.5))",
                    "drop-shadow(0 0 40px hsla(262, 83%, 58%, 0.8))",
                    "drop-shadow(0 0 20px hsla(262, 83%, 58%, 0.5))",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 relative">
              <motion.div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: "hsla(262, 83%, 58%, 0.2)" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(262, 83%, 58%) 0%, hsl(187, 94%, 48%) 100%)",
                    boxShadow: "0 0 20px hsla(262, 83%, 58%, 0.6)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                />
              </motion.div>

              {/* Progress Text */}
              <motion.p
                className="text-center mt-4 text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                جاري التحميل...
              </motion.p>
            </div>

            {/* Brand Text */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h1 className="text-2xl font-bold gradient-text">4 Creative</h1>
              <p className="text-muted-foreground text-sm mt-2">وكالة رقمية إبداعية</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
