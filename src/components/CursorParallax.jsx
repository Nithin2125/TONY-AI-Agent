import { useEffect, useState } from "react";

function CursorParallax({ children }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5);
      const y = (event.clientY / window.innerHeight - 0.5);

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const style = {
    transform: `
      perspective(1800px)
      rotateX(${position.y * -0.6}deg)
      rotateY(${position.x * 0.8}deg)
      translate3d(
        ${position.x * 2}px,
        ${position.y * 2}px,
        0
      )
    `,
    transition: "transform 0.18s ease-out",
    transformOrigin: "center center",
    width: "100%",
    minHeight: "100vh",
  };

  return <div style={style}>{children}</div>;
}

export default CursorParallax;