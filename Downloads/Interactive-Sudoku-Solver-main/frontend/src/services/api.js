// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/sudoku';

export const solveSudokuAPI = async (board) => {
  try {
    const response = await axios.post(`${API_URL}/solve`, { board });
    return response.data;
  } catch (error) {
    console.error("Error solving Sudoku:", error);
    if (error.response && error.response.data) {
       return error.response.data;
    }
    return { success: false, message: 'Server error or unreachable backend.' };
  }
};
