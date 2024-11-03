// src/App.tsx
import React, { useState } from 'react';
import ModeButtons from './components/ModeButtons';
import ParoliSystemForm from './components/systems/ParoliSystemForm';
import DoubleDozensForm from './components/systems/DoubleDozensForm';
import RouletteTable from './components/RouletteTable';

interface HistoryEntry {
  number: number;
  roundResult: number;
  result: number;
}

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [fallenNumbers, setFallenNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<number>(0); // Gesamtergebnis
  const [roundResult, setRoundResult] = useState<number>(0); // Ergebnis der aktuellen Runde
  const [betSize, setBetSize] = useState<{ [key: string]: number }>({
    Rot: 10,
    Schwarz: 10,
    Ungerade: 10,
    Gerade: 10,
    '1–18': 10,
    '19–36': 10,
  });
  const initialBetSize = 10;
  const [winStreak, setWinStreak] = useState<{ [key: string]: number }>({
    Rot: 0,
    Schwarz: 0,
    Ungerade: 0,
    Gerade: 0,
    '1–18': 0,
    '19–36': 0,
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]); // Verlaufsprotokoll

  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18,
    19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];

  const handleSelectMode = (selectedTitle: string) => {
    setTitle(selectedTitle);
    if (selectedTitle === 'Paroli-System' || selectedTitle === 'Double-Dozens') {
      setShowForm(true);
    } else {
      setShowTable(true);
    }
  };

  const handleNumberClick = (number: number) => {
    let currentRoundResult = 0;
    let newBetSize = { ...betSize };
    let newWinStreak = { ...winStreak };

    selectedOptions.forEach((option) => {
      let isWin = false;

      if (
        (option === 'Rot' && redNumbers.includes(number)) ||
        (option === 'Schwarz' && !redNumbers.includes(number) && number !== 0) ||
        (option === 'Ungerade' && number % 2 !== 0 && number !== 0) ||
        (option === 'Gerade' && number % 2 === 0 && number !== 0) ||
        (option === '1–18' && number >= 1 && number <= 18) ||
        (option === '19–36' && number >= 19 && number <= 36)
      ) {
        isWin = true;
      }

      if (isWin) {
        currentRoundResult += newBetSize[option];
        newWinStreak[option] += 1;
        if (newWinStreak[option] === 3) {
          newBetSize[option] = initialBetSize;
          newWinStreak[option] = 0; 
        } else {
          newBetSize[option] *= 2;
        }
      } else {
        currentRoundResult -= newBetSize[option];
        newWinStreak[option] = 0; 
        newBetSize[option] = initialBetSize;
      }
    });

    const newResult = result + currentRoundResult;

    setHistory((prevHistory) => [
      ...prevHistory,
      { number, roundResult: currentRoundResult, result }
    ]);

    setFallenNumbers((prevNumbers) => [...prevNumbers, number]);
    setRoundResult(currentRoundResult);
    setResult(newResult);
    setBetSize(newBetSize);
    setWinStreak(newWinStreak);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      setFallenNumbers((prevNumbers) => prevNumbers.slice(0, -1));
      setRoundResult(lastEntry.roundResult);
      setResult(lastEntry.result);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  const handleStartRoulette = () => {
    setShowForm(false);
    setShowTable(true);
  };

  const updateBetSettings = (size: number, options: string[]) => {
    const initialSizes = options.reduce((acc, option) => {
      acc[option] = size;
      return acc;
    }, {} as { [key: string]: number });
    setBetSize(initialSizes);
    setSelectedOptions(options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Roulette Table</h1>

      {!showForm && !showTable ? (
        <ModeButtons onSelectMode={handleSelectMode} />
      ) : showForm ? (
        <>
          {title && (
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          )}
          {title === 'Paroli-System' ? (
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
          {title && (
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          )}
          {/* Anzeige der aktuellen Einsatzgrößen */}
          {title === 'Paroli-System' && selectedOptions.length > 0 && (
            <div className="text-lg font-medium mb-4">
              Setzen:{' '}
              {selectedOptions.map((option, index) => (
                <span key={option}>
                  {option}:{' '}
                  <span className="font-bold">{betSize[option]}</span>
                  {index < selectedOptions.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}

          <RouletteTable
            onNumberClick={handleNumberClick}
            fallenNumbers={fallenNumbers}
            onUndo={handleUndo}
            result={`Gesamtergebnis: ${result}`}
            roundResult={`Ergebnis der Runde: ${roundResult}`}
          />
        </>
      )}
    </div>
  );
};

export default App;
