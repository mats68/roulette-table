// src/components/systems/ParoliSystemForm.tsx
import React, { useState } from 'react';

interface ParoliSystemFormProps {
  onStart: () => void;
  onUpdateBetSettings: (betSize: number, selectedOptions: string[]) => void;
}

const ParoliSystemForm: React.FC<ParoliSystemFormProps> = ({ onStart, onUpdateBetSettings }) => {
  const [betSize, setBetSize] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = ["Rot", "Schwarz", "Ungerade", "Gerade", "1–18", "19–36"];

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleStartClick = () => {
    onUpdateBetSettings(betSize, selectedOptions);
    onStart();
  };

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
        <label className="text-lg font-semibold">Gewählte Einfache Chancen:</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="form-checkbox h-5 w-5"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={handleStartClick}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Los
      </button>
    </div>
  );
};

export default ParoliSystemForm;
