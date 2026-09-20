// frontend/src/App.jsx
import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import { solveSudokuAPI } from './services/api';

const INITIAL_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function App() {
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(JSON.parse(JSON.stringify(INITIAL_PUZZLE)));
  const [invalidCells, setInvalidCells] = useState([]);
  const [focusedCell, setFocusedCell] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleCellChange = (row, col, value) => {
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
    validateBoard(newBoard, row, col, value);
    setStatusMessage({ text: '', type: '' });
  };

  const handleCellFocus = useCallback((row, col) => {
    setFocusedCell([row, col]);
    setStatusMessage({ text: '', type: '' });
  }, []);

  const validateBoard = (currentBoard, row, col, value) => {
    if (value === 0) {
      setInvalidCells(prev => prev.filter(pos => pos[0] !== row || pos[1] !== col));
      return;
    }

    let isConflict = false;

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && currentBoard[row][c] === value) isConflict = true;
    }
    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && currentBoard[r][col] === value) isConflict = true;
    }
    // Check 3x3 block
    const sr = Math.floor(row / 3) * 3;
    const sc = Math.floor(col / 3) * 3;
    for (let r = sr; r < sr + 3; r++) {
      for (let c = sc; c < sc + 3; c++) {
        if ((r !== row || c !== col) && currentBoard[r][c] === value) isConflict = true;
      }
    }

    if (isConflict) {
      setInvalidCells(prev => {
        if (!prev.some(p => p[0] === row && p[1] === col)) {
          return [...prev, [row, col]];
        }
        return prev;
      });
    } else {
      setInvalidCells(prev => prev.filter(pos => pos[0] !== row || pos[1] !== col));
    }
  };

  const checkSolution = () => {
    // Check if fully filled
    let isFilled = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) isFilled = false;
      }
    }

    if (!isFilled) {
      setStatusMessage({ text: 'Board is incomplete.', type: 'error' });
      return;
    }

    // Since we highlight invalid cells on entry, we just check if there are any invalid cells
    if (invalidCells.length > 0) {
      setStatusMessage({ text: 'There are mistakes on the board.', type: 'error' });
      return;
    }

    // Do a full validation check just to be sure
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = board[r][c];
        let count = 0;
        for (let i = 0; i < 9; i++) {
          if (board[r][i] === value) count++;
          if (board[i][c] === value) count++;
        }
        const sr = Math.floor(r / 3) * 3;
        const sc = Math.floor(c / 3) * 3;
        for (let ir = sr; ir < sr + 3; ir++) {
          for (let ic = sc; ic < sc + 3; ic++) {
            if (board[ir][ic] === value) count++;
          }
        }
        // count will be 3 (row self + col self + block self) if no conflicts
        if (count > 3) {
          setStatusMessage({ text: 'There are mistakes on the board.', type: 'error' });
          return;
        }
      }
    }

    setStatusMessage({ text: 'Congratulations! Puzzle Solved Successfully!', type: 'success' });
  };

  const resetBoard = () => {
    setBoard(JSON.parse(JSON.stringify(INITIAL_PUZZLE)));
    setInvalidCells([]);
    setStatusMessage({ text: 'Board reset.', type: '' });
  };

  const solveBoard = async () => {
    setLoading(true);
    setStatusMessage({ text: 'Solving...', type: '' });
    
    // Create a board with only clues to solve, to avoid unsolvable states from user input
    // Wait, the user might want to solve from current state. The python app uses the current board.
    // Let's use current board.
    
    // Parse to ensure integers
    const boardToSend = board.map(r => r.map(c => typeof c === 'string' ? parseInt(c) || 0 : c));

    const response = await solveSudokuAPI(boardToSend);
    
    if (response.success) {
      setBoard(response.board);
      setInvalidCells([]);
      setStatusMessage({ text: 'Puzzle Solved!', type: 'success' });
    } else {
      setStatusMessage({ text: response.message || 'No solution found for this puzzle.', type: 'error' });
    }
    setLoading(false);
  };

  const getCandidates = () => {
    if (!focusedCell) {
      setStatusMessage({ text: 'Please select (click) an empty cell first.', type: 'error' });
      return;
    }
    const [r, c] = focusedCell;
    if (board[r][c] !== 0) {
      setStatusMessage({ text: 'Cell already filled or no candidates.', type: 'error' });
      return;
    }

    const used = new Set();
    for (let i = 0; i < 9; i++) {
      if (board[r][i] !== 0) used.add(board[r][i]);
      if (board[i][c] !== 0) used.add(board[i][c]);
    }
    const sr = Math.floor(r / 3) * 3;
    const sc = Math.floor(c / 3) * 3;
    for (let ir = sr; ir < sr + 3; ir++) {
      for (let ic = sc; ic < sc + 3; ic++) {
        if (board[ir][ic] !== 0) used.add(board[ir][ic]);
      }
    }

    const candidates = [];
    for (let i = 1; i <= 9; i++) {
      if (!used.has(i)) candidates.push(i);
    }

    if (candidates.length === 0) {
      setStatusMessage({ text: 'Cell already filled or no candidates.', type: 'error' });
    } else {
      setStatusMessage({ text: `Possible: ${candidates.join(' ')}`, type: 'success' });
    }
  };

  return (
    <>
      <div className="header">
        <h1>Sudoku</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <Board
        board={board}
        initialBoard={INITIAL_PUZZLE}
        invalidCells={invalidCells}
        onCellChange={handleCellChange}
        onCellFocus={handleCellFocus}
      />

      <Controls
        onCheck={checkSolution}
        onReset={resetBoard}
        onSolve={solveBoard}
        onHint={getCandidates}
        loading={loading}
      />

      {statusMessage.text && (
        <div className={`info-text ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}
    </>
  );
}

export default App;
