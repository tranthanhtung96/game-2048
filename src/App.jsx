import { useState } from "react";
import Box from "./components/Box.jsx";

export default function App() {
  const [values] = useState([
    [2, 4, 8, 16],
    [32, 64, 128, 256],
    [512, 1024, 2048, 0],
    [4, 8, 0, 32],
  ]);

  const handleKeyDown = (event) => {
    console.log("User pressed: ", event.key);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="flex h-screen items-center justify-center"
    >
      <div className="max-w-md rounded-lg bg-[#faf8ef] p-6">
        <div className="pb-4 text-6xl font-bold text-[#776f66]">2048</div>
        <div className="pb-4 text-xl text-[#776f66]">
          Join the numbers and get to the <b>2048 title!</b>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-[#bbae9e] p-2">
          {values.map((row, rowIndex) => (
            <div key={rowIndex} className="flex h-full flex-row gap-2">
              {row.map((col, colIndex) => (
                <Box key={colIndex} number={col} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
