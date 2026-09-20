// frontend/src/components/Cell.jsx
import React from 'react';

const Cell = ({ row, col, value, isClue, isInvalid, onCellChange, onCellFocus }) => {
  // Determine block class for background color
  const blockRow = Math.floor(row / 3);
  const blockCol = Math.floor(col / 3);
  const blockClass = `block-${blockRow}-${blockCol}`;
  const rowClass = `cell-row-${row}`;

  let className = `cell ${blockClass} ${rowClass}`;
  if (isClue) className += ' clue';
  if (isInvalid) className += ' invalid';

  const handleChange = (e) => {
    if (isClue) return;
    const val = e.target.value.slice(-1); // only take last typed char
    if (val === '' || /^[1-9]$/.test(val)) {
      onCellChange(row, col, val === '' ? 0 : parseInt(val, 10));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!isClue) onCellChange(row, col, 0);
    }
  };

  return (
    <input
      type="text"
      className={className}
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => onCellFocus(row, col)}
      readOnly={isClue}
      inputMode="numeric"
    />
  );
};

export default React.memo(Cell);
