import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [currentValue, setValue] = useState(PLAYER_1);  
  const [winner, setWinner] = useState('');

  // determine current player
  const togglePlayer = () => {
    if (currentValue === PLAYER_1) {
      setValue(PLAYER_2);
    } else {
      setValue(PLAYER_1);
    }
  }

  const onClickCallback = (squareId) => {
    const newSquares = [];

    // if there is a winner, do not update board
    if (winner !== '') {
      return;
    } else {
      squares.forEach((row) => {    
        const newRow = [];
        row.forEach(square => {
          // only change square if it's empty
          if (square.value === '') {
            if (square.id === squareId) {
              togglePlayer();
              square.value = currentValue;
            } 
          }
          newRow.push(square);
        });
        newSquares.push(newRow);
      })

      checkForWinner();
      setSquares(newSquares);  
    }
  }
  
  const checkForWinner = () => {
    const flattenSquares = squares.flat();
    const squareValues = flattenSquares.map(square => square.value);
    
    // index of layout
    // 0 1 2
    // 3 4 5
    // 6 7 8
        
    if (
      [squareValues[0], squareValues[1], squareValues[2]].every( value => value === PLAYER_1) || 
      [squareValues[3], squareValues[4], squareValues[5]].every( value => value === PLAYER_1) || 
      [squareValues[6], squareValues[7], squareValues[8]].every( value => value === PLAYER_1) || 
      [squareValues[0], squareValues[3], squareValues[6]].every( value => value === PLAYER_1) || 
      [squareValues[1], squareValues[4], squareValues[7]].every( value => value === PLAYER_1) || 
      [squareValues[2], squareValues[5], squareValues[8]].every( value => value === PLAYER_1) || 
      [squareValues[0], squareValues[4], squareValues[8]].every( value => value === PLAYER_1) || 
      [squareValues[2], squareValues[4], squareValues[6]].every( value => value === PLAYER_1)
      ) {
      setWinner(PLAYER_1);

    }
    if (
      [squareValues[0], squareValues[1], squareValues[2]].every( value => value === PLAYER_2) || 
      [squareValues[3], squareValues[4], squareValues[5]].every( value => value === PLAYER_2) || 
      [squareValues[6], squareValues[7], squareValues[8]].every( value => value === PLAYER_2) || 
      [squareValues[0], squareValues[3], squareValues[6]].every( value => value === PLAYER_2) || 
      [squareValues[1], squareValues[4], squareValues[7]].every( value => value === PLAYER_2) || 
      [squareValues[2], squareValues[5], squareValues[8]].every( value => value === PLAYER_2) || 
      [squareValues[0], squareValues[4], squareValues[8]].every( value => value === PLAYER_2) || 
      [squareValues[2], squareValues[4], squareValues[6]].every( value => value === PLAYER_2)
      ) {
      setWinner(PLAYER_2);
    }
  }

  const resetGame = () => {
    setValue(PLAYER_1);
    setWinner('');
    setSquares(generateSquares);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {winner} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
}

export default App;
