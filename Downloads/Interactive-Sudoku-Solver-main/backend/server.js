// backend/server.js
const express = require('express');
const cors = require('cors');
const sudokuRoutes = require('./routes/sudokuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sudoku', sudokuRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('Sudoku API is running');
});

app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
