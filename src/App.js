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
  console.log(squares);

  const [currentValue, setValue] = useState(PLAYER_1);  

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
      checkForWinner();
      newSquares.push(newRow);
    })

    setSquares(newSquares);
  }

  // For wave 3, you will add the game logic to detect if a player has one or if there is a tie (all squares filled and with no winner). To do this you will complete the checkForWinner method and display the winner in the header section. The game should also cease responding to clicks on the board if the game has a winner.  
  
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
      console.log('winner is ' + PLAYER_1);
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
      console.log('winner is ' + PLAYER_2);
    }

  }

  const resetGame = () => {
    // Complete in Wave 4
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
}

export default App;
