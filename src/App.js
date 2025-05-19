import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [script, setScript] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const [message, setMessage] = useState("");

  const runBlocks = async (blocks) => {
    for (let block of blocks) {
      if (block.type === "move") {
        setPosition((prev) => ({ ...prev, x: prev.x + block.value }));
      } else if (block.type === "turn") {
        setPosition((prev) => ({ ...prev, angle: prev.angle + block.value }));
      } else if (block.type === "goto") {
        setPosition({ x: block.x, y: block.y, angle: 0 });
      } else if (block.type === "say" || block.type === "think") {
        setMessage(block.text);
        await new Promise((r) => setTimeout(r, block.seconds * 1000));
        setMessage("");
      } else if (block.type === "repeat") {
        const index = blocks.indexOf(block);
        const nested = blocks.slice(index + 1);
        for (let i = 0; i < block.count; i++) {
          await runBlocks(nested);
        }
        break;
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  };

  const runScript = async () => {
    await runBlocks(script);
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar />
          <MidArea script={script} setScript={setScript} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-col bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea position={position} message={message} />
          <button onClick={runScript} className="bg-green-500 text-white m-4 px-4 py-2 rounded">
            Run
          </button>
        </div>
      </div>
    </div>
  );
}



