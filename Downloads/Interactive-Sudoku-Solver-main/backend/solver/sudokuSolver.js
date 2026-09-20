// backend/solver/sudokuSolver.js

/**
 * Validates a 9x9 Sudoku grid.
 */
function isValidGrid(grid) {
  if (!Array.isArray(grid) || grid.length !== 9) return false;
  for (let i = 0; i < 9; i++) {
    if (!Array.isArray(grid[i]) || grid[i].length !== 9) return false;
    for (let j = 0; j < 9; j++) {
      const val = grid[i][j];
      if (typeof val !== 'number' || val < 0 || val > 9) return false;
    }
  }
  return true;
}

/**
 * Checks if it's safe to place 'num' at grid[row][col].
 */
function isSafe(grid, row, col, num) {
  // Check row
  if (grid[row].includes(num)) return false;

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check 3x3 block
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

/**
 * Finds the first empty cell (represented by 0).
 */
function findEmpty(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

/**
 * Solves the Sudoku grid in-place using backtracking.
 * Returns true if a solution is found, false otherwise.
 */
function solveSudoku(grid) {
  const emptyPos = findEmpty(grid);
  if (!emptyPos) {
    return true; // No empty spaces, puzzle solved
  }

  const [row, col] = emptyPos;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid)) {
        return true;
      }

      // Backtrack
      grid[row][col] = 0;
    }
  }

  return false;
}

/**
 * Validates the initial grid to make sure it doesn't have conflicting clues.
 */
function isValidInitialBoard(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num !== 0) {
        grid[i][j] = 0; // Temporarily empty
        if (!isSafe(grid, i, j, num)) {
          return false;
        }
        grid[i][j] = num; // Restore
      }
    }
  }
  return true;
}

module.exports = {
  isValidGrid,
  solveSudoku,
  isValidInitialBoard
};
