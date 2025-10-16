import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Background = ({ section = 0 }) => {
  const material = useRef();
  const color = useRef({
    color: "#b9bcff",
  });

  // Color transitions based on section
  const getColorForSection = (sec) => {
    const colors = [
      "#b9bcff", // Section 0 - About
      "#212121", // Section 1 - Skills
      "#7a7ca5", // Section 2 - Projects
      "#9b96dd", // Section 3 - Education
      "#8a8ac7", // Section 4 - Achievements
      "#7578b8", // Section 5 - Current Work
      "#6b6eaa", // Section 6 - Services
      "#9b96dd", // Section 7 - Testimonials
      "#b9bcff", // Section 8 - Contact
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
