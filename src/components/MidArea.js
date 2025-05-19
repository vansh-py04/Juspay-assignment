import React from "react";

export default function MidArea({ script, setScript }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const block = JSON.parse(e.dataTransfer.getData("block"));
    setScript((prev) => [...prev, block]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...script];
    updated[index][field] = field === "text" ? value : parseInt(value);
    setScript(updated);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex-1 h-full overflow-auto p-4 border border-dashed border-gray-400"
    >
      <h2 className="font-bold mb-2">Code Area</h2>
      {script.map((block, index) => (
        <div key={index} className="bg-gray-200 p-2 my-2 text-sm">
          {block.type === "move" && (
            <div>
              Move <input type="number" value={block.value} onChange={(e) => handleChange(index, "value", e.target.value)} className="mx-2 w-16" /> steps
            </div>
          )}
          {block.type === "turn" && (
            <div>
              Turn <input type="number" value={block.value} onChange={(e) => handleChange(index, "value", e.target.value)} className="mx-2 w-16" /> degrees
            </div>
          )}
          {block.type === "goto" && (
            <div>
              Go to x: <input type="number" value={block.x} onChange={(e) => handleChange(index, "x", e.target.value)} className="mx-1 w-16" />
              y: <input type="number" value={block.y} onChange={(e) => handleChange(index, "y", e.target.value)} className="mx-1 w-16" />
            </div>
          )}
          {block.type === "repeat" && (
            <div>
              Repeat <input type="number" value={block.count} onChange={(e) => handleChange(index, "count", e.target.value)} className="mx-2 w-16" /> times
            </div>
          )}
          {block.type === "say" && (
            <div>
              Say <input type="text" value={block.text} onChange={(e) => handleChange(index, "text", e.target.value)} className="mx-2 w-32" /> for <input type="number" value={block.seconds} onChange={(e) => handleChange(index, "seconds", e.target.value)} className="mx-2 w-16" /> seconds
            </div>
          )}
          {block.type === "think" && (
            <div>
              Think <input type="text" value={block.text} onChange={(e) => handleChange(index, "text", e.target.value)} className="mx-2 w-32" /> for <input type="number" value={block.seconds} onChange={(e) => handleChange(index, "seconds", e.target.value)} className="mx-2 w-16" /> seconds
            </div>
          )}
        </div>
      ))}
    </div>
  );
}




