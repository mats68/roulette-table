// src/components/ModeButtons.tsx
import React from 'react';

interface ModeButtonsProps {
  onSelectMode: (title: string) => void;
}

const ModeButtons: React.FC<ModeButtonsProps> = ({ onSelectMode }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onSelectMode("Paroli-System")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Paroli-System
      </button>
      <button
        onClick={() => onSelectMode("Double-Dozens")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Double-Dozens
      </button>
    </div>
  );
};

export default ModeButtons;
