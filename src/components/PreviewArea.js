import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ position, message }) {
  return (
    <div className="flex-1 h-full flex items-center justify-center relative">
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${position.angle}deg)`,
          transition: "transform 0.3s ease"
        }}
      >
        <CatSprite />
      </div>
      {message && (
        <div className="absolute top-10 bg-white border p-2 rounded shadow">
          {message}
        </div>
      )}
    </div>
  );
}




