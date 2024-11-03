// src/App.tsx
import React, { useState } from 'react';
import ModeButtons from './components/ModeButtons';
import ParoliSystemForm from './components/systems/ParoliSystemForm';
import DoubleDozensForm from './components/systems/DoubleDozensForm';
import RouletteTable from './components/RouletteTable';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [fallenNumbers, setFallenNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<number>(0);
  const [betSize, setBetSize] = useState(10);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];

  const handleSelectMode = (selectedTitle: string) => {
    setTitle(selectedTitle);
    if (selectedTitle === "Paroli-System" || selectedTitle === "Double-Dozens") {
      setShowForm(true);
    } else {
      setShowTable(true);
    }
  };

  const handleNumberClick = (number: number) => {
    setFallenNumbers((prevNumbers) => [...prevNumbers, number]);

    let roundResult = 0;
    if (title === "Paroli-System") {
      roundResult = checkParoliWin(number);
    } else if (title === "Double-Dozens") {
      roundResult = checkDoubleDozensWin(number);
    }

    setResult((prevResult) => prevResult + roundResult);
  };

  const checkParoliWin = (number: number) => {
    let winAmount = 0;

    if (selectedOptions.includes("Rot") && redNumbers.includes(number)) {
      winAmount += betSize;
    }
    if (selectedOptions.includes("Schwarz") && !redNumbers.includes(number)) {
      winAmount += betSize;
    }
    if (selectedOptions.includes("Ungerade") && number % 2 !== 0) {
      winAmount += betSize;
    }
    if (selectedOptions.includes("Gerade") && number % 2 === 0) {
      winAmount += betSize;
    }
    if (selectedOptions.includes("1–18") && number >= 1 && number <= 18) {
      winAmount += betSize;
    }
    if (selectedOptions.includes("19–36") && number >= 19 && number <= 36) {
      winAmount += betSize;
    }

    return winAmount;
  };

  const checkDoubleDozensWin = (number: number) => {
    // Beispielhafte Gewinnbedingung für das Double-Dozens-System
    return number >= 13 && number <= 24 ? betSize : -betSize;
  };

  const handleUndo = () => {
    setFallenNumbers((prevNumbers) => prevNumbers.slice(0, -1));
  };

  const handleStartRoulette = () => {
    setShowForm(false);
    setShowTable(true);
  };

  const updateBetSettings = (size: number, options: string[]) => {
    setBetSize(size);
    setSelectedOptions(options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Roulette Table</h1>

      {!showForm && !showTable ? (
        <ModeButtons onSelectMode={handleSelectMode} />
      ) : showForm ? (
        <>
          {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
          {title === "Paroli-System" ? (
            <ParoliSystemForm
              onStart={handleStartRoulette}
              onUpdateBetSettings={updateBetSettings}
            />
          ) : (
            <DoubleDozensForm onStart={handleStartRoulette} />
          )}
        </>
      ) : (
        <>
          {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}
          <RouletteTable
            onNumberClick={handleNumberClick}
            fallenNumbers={fallenNumbers}
            onUndo={handleUndo}
            result={`Gesamtergebnis: ${result}`}
          />
        </>
      )}
    </div>
  );
};

export default App;
