import { useEffect, useState } from "react";
import Box from "./components/Box.jsx";
import { calculate, init } from "./libraries/calculate.js";

export default function App() {
  const [values, setValues] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);

  useEffect(() => {
    setValues(init());
  }, []);

  const initValues = () => {
    setValues(init());
    setIsWin(false);
    setIsLose(false);
  };

  const mutateValues = (direction) => {
    const { newValues, isWin, isLose } = calculate(values, direction);
    setValues(newValues);
    setIsWin(isWin);
    setIsLose(isLose);
  };

  const handleKeyDown = (event) => {
    if (isWin || isLose) {
      initValues();
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        mutateValues("down");
        break;
      case "ArrowUp":
        mutateValues("up");
        break;
      case "ArrowLeft":
        mutateValues("left");
        break;
      case "ArrowRight":
        mutateValues("right");
        break;
    }
  };

  const handleStart = (e) => {
    setStartX(getClientX(e));
    setStartY(getClientY(e));
    setEndX(getClientX(e));
    setEndY(getClientY(e));
  };

  const handleMove = (e) => {
    setEndX(getClientX(e));
    setEndY(getClientY(e));
  };

  const handleEnd = () => {
    if (isWin || isLose) {
      initValues();
      return;
    }

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) mutateValues("right");
      else if (deltaX < 0) mutateValues("left");
    } else {
      if (deltaY > 0) mutateValues("down");
      else if (deltaY < 0) mutateValues("up");
    }
  };

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
  const getClientY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      className="noselect flex h-[calc(100dvh)] w-full items-center justify-center bg-gray-700"
    >
      <div className="max-w-md rounded-lg bg-[#faf8ef] p-6">
        <div className="text-6xl font-bold text-[#776f66]">2048</div>
        <div className="pb-6 text-2xl text-[#776f66]">
          Join the numbers and get to the <b>2048 title!</b>
        </div>
        <div className="relative">
          {isLose && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-yellow-200 bg-opacity-60 text-4xl font-bold text-white">
              You Lose!
            </div>
          )}
          {isWin && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-yellow-200 bg-opacity-60 text-4xl font-bold text-white">
              You Win!
            </div>
          )}
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
    </div>
  );
}
