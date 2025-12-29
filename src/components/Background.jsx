import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAtom } from "jotai";
import { themeAtom } from "../config";

export const Background = ({ section = 0 }) => {
  const [theme] = useAtom(themeAtom);
  const material = useRef();
  const color = useRef({
    color: theme === "light" ? "#f8fafc" : "#1a1a1a",
  });

  // Color transitions based on section and theme
  const getColorForSection = (sec, currentTheme) => {
    if (currentTheme === "light") {
      const colors = [
        "#f8fafc", // Section 0 - About
        "#f1f5f9", // Section 1 - Skills
        "#e2e8f0", // Section 2 - Projects
        "#cbd5e1", // Section 3 - Education
        "#f8fafc", // Section 4 - Achievements
        "#f1f5f9", // Section 5 - Current Work
        "#e2e8f0", // Section 6 - Services
        "#cbd5e1", // Section 7 - Testimonials
        "#f8fafc", // Section 8 - Blog
        "#f1f5f9", // Section 9 - Contact
      ];
      return colors[Math.min(sec, colors.length - 1)];
    } else {
      const colors = [
        "#1a1a1a", // Section 0 - About
        "#0f0f0f", // Section 1 - Skills
        "#1e1e1e", // Section 2 - Projects
        "#252525", // Section 3 - Education
        "#1a1a1a", // Section 4 - Achievements
        "#2a2a2a", // Section 5 - Current Work
        "#1e1e1e", // Section 6 - Services
        "#252525", // Section 7 - Testimonials
        "#1a1a1a", // Section 8 - Blog
        "#0f0f0f", // Section 9 - Contact
      ];
      return colors[Math.min(sec, colors.length - 1)];
    }
  };

  useEffect(() => {
    const targetColor = getColorForSection(section, theme);
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
  }, [section, theme]);

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
