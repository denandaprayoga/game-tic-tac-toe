/* eslint-disable react/prop-types */
import { useState } from 'react';

function Square({ value, onSquareClick, classname }) {
  return (
    <button className={classname} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, steps }) {
  const winner = calculateWinner(squares);
  const lengthBoard = 3;
  const rows = [...Array(lengthBoard).keys()].map((row) => {
    const columns = [...Array(lengthBoard).keys()].map((col) => {
      const i = lengthBoard * row + col;
      const step = [row, col];
      return (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i, step)}
          classname={linesWinner(i)}
        />
      );
    });
    return (
      <div key={row} className='board'>
        {columns}
      </div>
    );
  });

  function handleClick(i, step) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O');
    const newStep = steps.slice();
    newStep[0] = step[0];
    newStep[1] = step[1];
    onPlay(nextSquares, newStep);
  }

  let status;
  if (winner) {
    status = 'Pemenangnya adalah ' + winner.winner;
  } else {
    !squares.includes(null)
      ? (status = 'pertandingan seri')
      : (status = 'Pemain selanjutnya ' + (xIsNext ? 'X' : 'O'));
  }

  function linesWinner(indexSquare) {
    if (winner !== null) {
      for (let i = 0; i < winner.lines.length; i++) {
        if (winner.lines[i] === indexSquare) {
          return 'square square-winner';
        }
      }
    }
    return 'square';
  }

  return (
    <>
      <div className='status'>{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascending, setAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  const displayAscending = ascending ? 'Ascending' : 'Descending';
  const [step, setStep] = useState([Array(2).fill(null)]);
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winner = {
        winner: squares[a],
        lines: lines[i],
      };
      return winner;
    }
  }
  return null;
}
