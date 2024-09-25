This is a very abstract task, and the exact interface will depend on your specific game requirements, but let's assume we're creating a simple interface for a tic-tac-toe game. Here is a basic implementation:

```jsx
import React, { useState } from 'react';

const Square = ({ value, onClick }) => (
  <button style={{ height: 20, width: 20 }} onClick={onClick}>
    {value}
  </button>
);

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => <Square value={squares[i]} onClick={() => handleClick(i)} />;

  return (
    <div>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  );
};

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);

export default Game;
```
In the code above:
- `Square` is a functional component that renders a button with an onClick listener.
- `handleClick` inside `Board` updates the state of the game each time a user clicks on a square.
- `renderSquare` is a helper function to abstract away the creation of `Square` components.
- The number of squares and their arrangement would be adjusted according to the specific game.