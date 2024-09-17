import React, { useState } from 'react';
import './style.css';
import Auto from '../autoComplete/Auto';

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

export default function Tictac() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isXturn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null); // State to track the winner

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6], // Right-to-left diagonal
  ];

  // Function to check if there is a winner
  function checkWinner(board) {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return "X" or "O" as the winner
      }
    }
    return null; // No winner yet
  }

  function handleClick(crntindex) {
    if (winner || squares[crntindex]) return; // Prevent click if game is over or square is filled

    let copy = [...squares];

    // Only update the square if it is empty
    if (copy[crntindex] === '') {
      copy[crntindex] = isXturn ? 'X' : 'O'; // Update the square with "X" or "O"
      setSquares(copy); // Update squares state
      setIsXTurn(!isXturn); // Toggle turn

      // Check for a winner
      const result = checkWinner(copy);
      if (result) {
        setWinner(result); // Update the winner state
      }
    }
  }

  function Restart() {
    setSquares(Array(9).fill('')); // Reset the board
    setIsXTurn(true); // Reset to X's turn
    setWinner(null); // Reset winner
  }

  let status = winner ? `Winner: ${winner}` : `It is: ${isXturn ? 'X' : 'O'} turn`;

  return (
    <div>
      <div className="tic-tac-toe-container">
        <div className="row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <h2 style={{ textAlign: 'center' }}>{status}</h2>
      <button onClick={Restart}>Restart</button>
    </div>
  );
}
