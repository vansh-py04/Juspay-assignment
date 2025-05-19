import React from "react";
import Icon from "./Icon";

const blocks = [
  { type: "move", label: "Move", value: 10 },
  { type: "turn", label: "Turn", value: 15 },
  { type: "goto", label: "Go to", x: 0, y: 0 },
  { type: "repeat", label: "Repeat", count: 5 },
  { type: "say", label: "Say", text: "Hello", seconds: 2 },
  { type: "think", label: "Think", text: "Hmm...", seconds: 2 }
];

export default function Sidebar() {
  const handleDragStart = (e, block) => {
    e.dataTransfer.setData("block", JSON.stringify(block));
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">Events</div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        When <Icon name="flag" size={15} className="text-green-600 mx-2" /> clicked
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        When this sprite clicked
      </div>

      <div className="font-bold">Motion</div>
      {blocks.filter(b => ["move", "turn", "goto", "repeat"].includes(b.type)).map((block, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => handleDragStart(e, block)}
          className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          {block.label}
        </div>
      ))}

      <div className="font-bold">Looks</div>
      {blocks.filter(b => ["say", "think"].includes(b.type)).map((block, i) => (
        <div
          key={i}
          draggable
          onDragStart={(e) => handleDragStart(e, block)}
          className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        >
          {block.label}
        </div>
      ))}
    </div>
  );
}