export default function Square({ value, onSquareClick, classname }) {
  return (
    <button className={classname} onClick={onSquareClick}>
      {value}
    </button>
  );
}
