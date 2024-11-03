import React, { useState } from 'react';

const rouletteNumbers = [
  { number: 0, color: 'bg-green-600' },
  { number: 1, color: 'bg-red-600' },
  { number: 2, color: 'bg-black' },
  { number: 3, color: 'bg-red-600' },
  { number: 4, color: 'bg-black' },
  { number: 5, color: 'bg-red-600' },
  { number: 6, color: 'bg-black' },
  { number: 7, color: 'bg-red-600' },
  { number: 8, color: 'bg-black' },
  { number: 9, color: 'bg-red-600' },
  { number: 10, color: 'bg-black' },
  { number: 11, color: 'bg-black' },
  { number: 12, color: 'bg-red-600' },
  { number: 13, color: 'bg-black' },
  { number: 14, color: 'bg-red-600' },
  { number: 15, color: 'bg-black' },
  { number: 16, color: 'bg-red-600' },
  { number: 17, color: 'bg-black' },
  { number: 18, color: 'bg-red-600' },
  { number: 19, color: 'bg-red-600' },
  { number: 20, color: 'bg-black' },
  { number: 21, color: 'bg-red-600' },
  { number: 22, color: 'bg-black' },
  { number: 23, color: 'bg-red-600' },
  { number: 24, color: 'bg-black' },
  { number: 25, color: 'bg-red-600' },
  { number: 26, color: 'bg-black' },
  { number: 27, color: 'bg-red-600' },
  { number: 28, color: 'bg-black' },
  { number: 29, color: 'bg-black' },
  { number: 30, color: 'bg-red-600' },
  { number: 31, color: 'bg-black' },
  { number: 32, color: 'bg-red-600' },
  { number: 33, color: 'bg-black' },
  { number: 34, color: 'bg-red-600' },
  { number: 35, color: 'bg-black' },
  { number: 36, color: 'bg-red-600' },
];

const App: React.FC = () => {
  const [fallenNumbers, setFallenNumbers] = useState<number[]>([]);

  const handleClick = (number: number) => {
    setFallenNumbers((prevNumbers) => [...prevNumbers, number]);
  };

  const handleUndo = () => {
    setFallenNumbers((prevNumbers) => prevNumbers.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Roulette Table</h1>
      <div className="grid grid-cols-6 gap-2 mb-8">
        {rouletteNumbers.map(({ number, color }) => (
          <button
            key={number}
            className={`w-16 h-16 text-white font-bold ${color} rounded-full flex items-center justify-center`}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {fallenNumbers.length > 0 && (
          <p className="text-xl mb-4">
            Gefallene Nummern: {fallenNumbers.join(', ')}
          </p>
        )}
        <button
          onClick={handleUndo}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={fallenNumbers.length === 0}
        >
          Rückgängig
        </button>
      </div>
    </div>
  );
};

export default App;
