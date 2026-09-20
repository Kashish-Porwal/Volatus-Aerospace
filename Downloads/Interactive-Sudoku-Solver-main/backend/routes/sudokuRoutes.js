// backend/routes/sudokuRoutes.js
const express = require('express');
const router = express.Router();
const { isValidGrid, solveSudoku, isValidInitialBoard } = require('../solver/sudokuSolver');

router.post('/solve', (req, res) => {
  const { board } = req.body;

  // Basic validation
  if (!isValidGrid(board)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid board format. Must be a 9x9 grid of numbers (0-9).'
    });
  }

  // Deep copy the board to avoid mutating the original request body if we need it
  const gridCopy = JSON.parse(JSON.stringify(board));

  // Check if initial board has conflicts
  if (!isValidInitialBoard(gridCopy)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid initial board. There are conflicting numbers.'
    });
  }

  // Attempt to solve
  const isSolved = solveSudoku(gridCopy);

  if (isSolved) {
    return res.json({
      success: true,
      board: gridCopy
    });
  } else {
    return res.json({
      success: false,
      message: 'No solution found'
    });
  }
});

module.exports = router;
