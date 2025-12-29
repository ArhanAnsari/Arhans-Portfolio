import { atom } from "jotai";

export const framerMotionConfig = {
  type: "spring",
  mass: 5,
  stiffness: 500,
  damping: 55,
  restDelta: 0.0001,
};

export const themeAtom = atom("dark");
