import { useState } from 'react';
import Board from './Board';

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const [step, setStep] = useState([Array(2).fill(null)]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  const displayAscending = ascending ? 'Ascending' : 'Descending';
  const currentStep = step[currentMove];

  function handlePlay(nextSquares, step1) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextStep = [...step.slice(0, currentMove + 1), step1];
    setStep(nextStep);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const [baris, kolom] = step[move];
      description = `Langkah${move} [${baris}][${kolom}]`;
    } else {
      description = 'Pergi ke awal permainan';
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <>Anda berada di langkah ke #{move}</>
        ) : (
          <button className='button' onClick={() => jumpTo(move)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  function toogleButtonAscending() {
    setAscending(!ascending);
  }
  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentSquare}
          onPlay={handlePlay}
          steps={currentStep}
        />
      </div>
      <div className='game-info'>
        <button className='button' onClick={toogleButtonAscending}>
          {displayAscending}
        </button>
        <ol>{ascending ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}
