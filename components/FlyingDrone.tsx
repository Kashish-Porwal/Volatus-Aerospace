"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export function FlyingDrone() {
  const { scrollYProgress } = useScroll();

  // Mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Scroll based animations
  // Drone moves from top-left to bottom-right across the page height
  const droneY = useTransform(scrollYProgress, [0, 1], ["10vh", "120vh"]);
  const droneX = useTransform(scrollYProgress, [0, 1], ["5vw", "80vw"]);
  const droneRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const droneScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Move drone slightly towards mouse (parallax effect)
      mouseX.set((e.clientX - centerX) * 0.05);
      mouseY.set((e.clientY - centerY) * 0.05);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <motion.div
        style={{
          y: droneY,
          x: droneX,
          rotate: droneRotate,
          scale: droneScale,
          translateX: x,
          translateY: y,
        }}
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48"
      >
        {/* Realistic Drone Image */}
        <motion.img
          src="https://pngimg.com/uploads/drone/drone_PNG204.png"
          alt="Flying Drone"
          className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-110"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
