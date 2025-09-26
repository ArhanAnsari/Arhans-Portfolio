import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef();
  const cursorDot = useRef();
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverText, setHoverText] = useState(false);
  const [clicked, setClicked] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }
    
    if (cursorDot.current) {
      cursorDot.current.style.left = `${mouseX}px`;
      cursorDot.current.style.top = `${mouseY}px`;
    }
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const mouseEventsListener = (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };
    
    document.addEventListener("mousemove", mouseEventsListener);
    const animateEvent = requestAnimationFrame(animate);
    
    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  useEffect(() => {
    const mouseOverListener = (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.parentElement?.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "a" ||
        e.target.parentElement?.tagName.toLowerCase() === "a" ||
        e.target.classList.contains("cursor-pointer") ||
        e.target.parentElement?.classList.contains("cursor-pointer")
      ) {
        setHoverButton(true);
      } else if (
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea" ||
        e.target.contentEditable === "true"
      ) {
        setHoverText(true);
      }
    };

    const mouseOutListener = () => {
      setHoverButton(false);
      setHoverText(false);
    };

    const mouseDownListener = () => {
      setClicked(true);
    };

    const mouseUpListener = () => {
      setClicked(false);
    };

    document.addEventListener("mouseover", mouseOverListener);
    document.addEventListener("mouseout", mouseOutListener);
    document.addEventListener("mousedown", mouseDownListener);
    document.addEventListener("mouseup", mouseUpListener);

    return () => {
      document.removeEventListener("mouseover", mouseOverListener);
      document.removeEventListener("mouseout", mouseOutListener);
      document.removeEventListener("mousedown", mouseDownListener);
      document.removeEventListener("mouseup", mouseUpListener);
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorDot}
        className={`fixed w-2 h-2 bg-primary-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ${
          hoverButton || hoverText ? "scale-150 bg-accent-400" : ""
        } ${clicked ? "scale-75" : ""}`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor Outline */}
      <div
        ref={cursorOutline}
        className={`fixed w-8 h-8 border-2 border-primary-400/50 rounded-full pointer-events-none z-50 transition-all duration-300 ${
          hoverButton 
            ? "scale-150 border-accent-400 bg-accent-400/10" 
            : hoverText 
            ? "scale-75 border-primary-600" 
            : ""
        } ${clicked ? "scale-125 border-primary-600 bg-primary-400/20" : ""}`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};