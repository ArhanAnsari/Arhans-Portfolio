import { useGLTF, useFBX, useTexture, useVideoTexture } from "@react-three/drei";

/**
 * AssetsPreloader - Preloads all 3D assets needed by Experience
 * 
 * This component triggers loading of all 3D models, animations, textures, and videos.
 * By mounting it inside the Canvas during loading, useProgress can track all assets.
 * 
 * Hooks used here ensure assets are cached, so Experience can reuse them instantly.
 * Returns null - this is purely for triggering asset loads.
 */
export const AssetsPreloader = () => {
  // Preload Avatar model and animations
  useGLTF("/models/646d9dcdc8a5f5bddbfac913.glb");
  useFBX("/animations/Typing.fbx");
  useFBX("/animations/Standing Idle.fbx");
  useFBX("/animations/Falling Idle.fbx");

  // Preload Office scene and textures
  useGLTF("models/scene.gltf");
  useTexture("textures/baked.jpg");
  useVideoTexture("textures/vscode.mp4");

  // This component doesn't render anything - it only triggers asset loading
  return null;
};
