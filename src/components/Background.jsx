import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = ({ section = 0 }) => {
  const material = useRef();
  const color = useRef({
    color: "#1a1a1a",
  });

  // Color transitions based on section
  const getColorForSection = (sec) => {
    const colors = [
      "#1a1a1a", // Section 0 - About (dark gray)
      "#0f0f0f", // Section 1 - Skills (darker)
      "#1e1e1e", // Section 2 - Projects (charcoal)
      "#252525", // Section 3 - Education (medium dark)
      "#1a1a1a", // Section 4 - Achievements (dark gray)
      "#2a2a2a", // Section 5 - Current Work (lighter gray)
      "#1e1e1e", // Section 6 - Services (charcoal)
      "#252525", // Section 7 - Testimonials (medium dark)
      "#1a1a1a", // Section 8 - Contact (dark gray)
    ];
    return colors[Math.min(sec, colors.length - 1)];
  };

  useEffect(() => {
    const targetColor = getColorForSection(section);
    // Smoothly transition to target color
    const startColor = color.current.color;
    let progress = 0;
    
    const animate = () => {
      progress += 0.05;
      if (progress < 1) {
        const interpolatedColor = new THREE.Color(startColor).lerp(
          new THREE.Color(targetColor),
          progress
        );
        color.current.color = '#' + interpolatedColor.getHexString();
        requestAnimationFrame(animate);
      } else {
        color.current.color = targetColor;
      }
    };
    
    animate();
  }, [section]);

  useFrame(() => {
    if (material.current) {
      material.current.color = new THREE.Color(color.current.color);
    }
  });

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
};
