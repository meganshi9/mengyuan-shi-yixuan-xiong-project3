import React from "react";
import clsx from "clsx"; 

const GameBoard = ({
  boardData,
  onCellClick,
  isOwnBoard = false,
  isInteractive = false,
}) => {
  return (
    <div className="grid grid-cols-10 gap-1 w-fit mx-auto">
      {boardData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const key = `${rowIndex}-${colIndex}`;
          const isHit = cell === "hit";
          const isMiss = cell === "miss";
          const hasShip = cell === "ship";

          let cellClass = "w-8 h-8 border bg-blue-200";

          if (isHit) cellClass += " bg-red-500";
          else if (isMiss) cellClass += " bg-gray-300";
          else if (hasShip && isOwnBoard) cellClass += " bg-green-400";

          return (
            <div
              key={key}
              className={clsx(cellClass, "cursor-pointer")}
              onClick={() =>
                isInteractive && onCellClick && onCellClick(rowIndex, colIndex)
              }
            ></div>
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
