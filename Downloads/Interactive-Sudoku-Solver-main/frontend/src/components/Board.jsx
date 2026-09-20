// frontend/src/components/Board.jsx
import React from 'react';
import Cell from './Cell';

const Board = ({ board, initialBoard, invalidCells, onCellChange, onCellFocus }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((val, colIndex) => {
          const isClue = initialBoard[rowIndex][colIndex] !== 0;
          const isInvalid = invalidCells.some(
            (pos) => pos[0] === rowIndex && pos[1] === colIndex
          );

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={val}
              isClue={isClue}
              isInvalid={isInvalid}
              onCellChange={onCellChange}
              onCellFocus={onCellFocus}
            />
          );
        })
      )}
    </div>
  );
};

export default React.memo(Board);
