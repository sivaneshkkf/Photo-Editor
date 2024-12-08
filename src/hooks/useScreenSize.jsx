import { useState, useEffect } from "react";

const breakpoints = {
  sm: 640, // Small screens (mobile)
  md: 768, // Medium screens (tablet)
  lg: 1024, // Large screens (desktop)
  xl: 1280, // Extra large screens
};

const getScreenSize = (width) => {
  if (width < breakpoints.sm) return "sm"; // Extra small screens
  if (width < breakpoints.md) return "md";
  if (width < breakpoints.lg) return "lg";
  if (width < breakpoints.xl) return "xl";
  return "2xl";
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    size: getScreenSize(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        size: getScreenSize(width),
      });
    };

    window.addEventListener("resize", handleResize);

    // Initial trigger to handle SSR or initial render
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
