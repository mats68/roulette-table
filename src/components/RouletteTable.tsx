// src/components/RouletteTable.tsx
import React from 'react';

interface RouletteTableProps {
  onNumberClick: (number: number) => void;
  fallenNumbers: number[];
  onUndo: () => void;
  result: string | null; // Neue Prop für das Ergebnis
}

const RouletteTable: React.FC<RouletteTableProps> = ({
  onNumberClick,
  fallenNumbers,
  onUndo,
  result,
}) => {
  const numbers = Array.from({ length: 36 }, (_, i) => i + 1);
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => onNumberClick(0)}
          className="w-16 h-16 bg-green-600 text-white rounded-full text-lg font-semibold"
        >
          0
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className={`w-16 h-16 rounded-full text-lg font-semibold ${
              redNumbers.includes(num) ? 'bg-red-600' : 'bg-black'
            } text-white`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="mt-4 text-lg">
        Gefallene Nummern: {fallenNumbers.join(', ')}
      </div>

      {result && (
        <div className="text-lg font-semibold text-center mt-4">
          {result}
        </div>
      )}

      <button
        onClick={onUndo}
        className="mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Rückgängig
      </button>
    </div>
  );
};

export default RouletteTable;
