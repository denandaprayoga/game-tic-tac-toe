import Square from './Square';
import calculateWinner from '../utils/calculateWinner';

export default function Board({ xIsNext, squares, onPlay, steps }) {
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
      ? (status = 'Pertandingan seri')
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
