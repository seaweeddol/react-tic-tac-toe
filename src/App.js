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
  const [currentPlayer, setPlayer] = useState(PLAYER_1);  
  const [winner, setWinner] = useState('');

  // determine current player
  const togglePlayer = () => {
    (currentPlayer === PLAYER_1) ? setPlayer(PLAYER_2) : setPlayer(PLAYER_1);
  }

  const onClickCallback = (clickedSquare) => {
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
            // check if current square matches clicked square
            if (square.id === clickedSquare) {
              togglePlayer();
              square.value = currentPlayer;
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

  // helper method for checkForWinnerHelper to check if all values in array are the same
  const allMatch = (array, player) => {
    // returns boolean value
    return array.every(value => value === player);
  }
  
  // helper method for checkForWinner
  // checks if there are three of the same value in a 'row' (row/col/diagonal)
  const checkForWinnerHelper = (squareValues, player) => {
    return (
      allMatch([squareValues[0], squareValues[1], squareValues[2]], player) || 
      allMatch([squareValues[3], squareValues[4], squareValues[5]], player) || 
      allMatch([squareValues[6], squareValues[7], squareValues[8]], player) || 
      allMatch([squareValues[0], squareValues[3], squareValues[6]], player) || 
      allMatch([squareValues[1], squareValues[4], squareValues[7]], player) || 
      allMatch([squareValues[2], squareValues[5], squareValues[8]], player) || 
      allMatch([squareValues[0], squareValues[4], squareValues[8]], player) || 
      allMatch([squareValues[2], squareValues[4], squareValues[6]], player)
    )
  }

  
  const checkForWinner = () => {
    // turn rows into an array of squares
    const flattenSquares = squares.flat();
    // save values from each square into an array
    const squareValues = flattenSquares.map(square => square.value);
            
    if (checkForWinnerHelper(squareValues, PLAYER_1)) {
      setWinner(PLAYER_1);
    } else if (checkForWinnerHelper(squareValues, PLAYER_2)) {
      setWinner(PLAYER_2);
    // check if every square is filled
    } else if (squareValues.every(value => value !== '')) {
      setWinner('no one!');
    }
  }

  const resetGame = () => {
    setPlayer(PLAYER_1);
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
