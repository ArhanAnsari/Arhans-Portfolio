import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Animated Wallpaper Component
 * Premium cinematic desktop with mesh gradients, particles, and mouse parallax
 */
export const Wallpaper = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const [particles, setParticles] = useState([]);

  // Initialize particles
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    particlesRef.current = newParticles;
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < -5) particle.x = 105;
        if (particle.x > 105) particle.x = -5;
        if (particle.y < -5) particle.y = 105;
        if (particle.y > 105) particle.y = -5;

        // Draw particle
        const screenX = (particle.x / 100) * canvas.width;
        const screenY = (particle.y / 100) * canvas.height;
        ctx.fillStyle = `rgba(139, 220, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = (e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    };
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas for particle animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-blue-900/80 to-cyan-900/60" />

      {/* Animated gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, rgba(34, 197, 228, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated mesh gradient blob 1 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15), transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Animated mesh gradient blob 2 */}
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 197, 228, 0.1), transparent 70%)',
          bottom: '-15%',
          left: '-5%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle mouse-responsive parallax effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 220, 255, 0.05) 0%, transparent 60%)',
        }}
        animate={{
          '--mouse-x': `${mouseRef.current.x}%`,
          '--mouse-y': `${mouseRef.current.y}%`,
        }}
      />

      {/* Shine/bloom effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-40" />
    </div>
  );
};
