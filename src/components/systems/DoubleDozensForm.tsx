// src/components/systems/DoubleDozensForm.tsx
import React, { useState } from 'react';

interface DoubleDozensFormProps {
  onStart: () => void;
}

const DoubleDozensForm: React.FC<DoubleDozensFormProps> = ({ onStart }) => {
  const [betSize, setBetSize] = useState(10);
  const [winTarget, setWinTarget] = useState(200);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded shadow-lg bg-white">
      <div className="flex flex-col">
        <label className="text-lg font-semibold">Wettgröße:</label>
        <input
          type="number"
          value={betSize}
          onChange={(e) => setBetSize(Number(e.target.value))}
          className="mt-1 p-2 border rounded w-32 text-center"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg font-semibold">Gewinnziel:</label>
        <input
          type="number"
          value={winTarget}
          onChange={(e) => setWinTarget(Number(e.target.value))}
          className="mt-1 p-2 border rounded w-32 text-center"
        />
      </div>
      <button
        onClick={onStart}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Los
      </button>
    </div>
  );
};

export default DoubleDozensForm;
