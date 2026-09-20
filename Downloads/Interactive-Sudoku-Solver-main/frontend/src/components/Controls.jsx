// frontend/src/components/Controls.jsx
import React from 'react';

const Controls = ({ onCheck, onReset, onSolve, onHint, loading }) => {
  return (
    <div className="controls-container">
      <button className="btn btn-check" onClick={onCheck} disabled={loading}>
        Check Solution
      </button>
      <button className="btn btn-reset" onClick={onReset} disabled={loading}>
        Reset
      </button>
      <button className="btn btn-solve" onClick={onSolve} disabled={loading}>
        Solve Puzzle
        {loading && <span className="loader"></span>}
      </button>
      <button className="btn btn-hint" onClick={onHint} title="Show Candidates" disabled={loading}>
        💡
      </button>
    </div>
  );
};

export default React.memo(Controls);
