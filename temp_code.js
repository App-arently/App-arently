Here you go:

```jsx
import React, { useState } from 'react';
import './Game.css';

// Game Start Screen
function GameStart({ startGame }) {
  return (
    <div className="start-game">
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

// Game End Screen
function GameEnd({ restartGame, score }) {
  return (
    <div className="end-game">
      <h1>Game Over!</h1>
      <h2>Your Score: {score}</h2>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}

// Game Pause Screen
function GamePause({ resumeGame }) {
  return (
    <div className="pause-game">
      <h1>Game Paused!</h1>
      <button onClick={resumeGame}>Resume Game</button>
    </div>
  );
}

// Parent Game Component
function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameStarted(true);
    // Code to start the game...
  };

  const pauseGame = () => {
    setGamePaused(true);
    // Code to pause the game...
  };

  const resumeGame = () => {
    setGamePaused(false);
    // Code to resume the game...
  };

  const gameOver = () => {
    setGameEnded(true);
    // Code to finish the game...
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setScore(0);
    // Code to restart the game...
  };

  // render appropriate screen
  if (!gameStarted && !gameEnded) {
    return <GameStart startGame={startGame} />;
  } else if (gamePaused) {
    return <GamePause resumeGame={resumeGame} />;
  } else if (gameEnded) {
    return <GameEnd restartGame={restartGame} score={score} />;
  } else {
    // render Game screen
    // pass pauseGame and gameOver as props to Game screen/controls if needed
    // manage score via setScore based on game logic 
  }
}

export default Game;
```
First, we create our screens as functional components that individually handle Start, Pause and End game states. We then handle the logic for starting, pausing and ending the game in the Game component which utilizes state hooks to track our Game's state. We conditionally render the relevant screens based on the current state of the game.