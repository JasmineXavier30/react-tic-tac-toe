import Square from './Square';
import { useState } from 'react';

export default function Board({xIsNext, squares, onStoreHistory, move}) {
  
    // Display X or O on Click
    let handleClick = (i) => {
      const nextSquares = squares.slice();
      if(nextSquares[i] || calculateWinner(squares)) return;
      if(xIsNext) nextSquares[i] = 'X';
      else nextSquares[i] = 'O';
      onStoreHistory(nextSquares);
    }
    
    // rendering squares on the board
    let squaresArr;
    let renderSquares = (a) => {
      squaresArr = [];
      for(let i=a; i<a+3; i++){
        squaresArr.push(<Square value={squares[i]} onSquareClick={()=>handleClick(i)}/>)
      }
      return squaresArr;
    }
  
    //set status
    let status;
    const winner = calculateWinner(squares);
    if(winner) status = `The winner is ${winner}`;
    else if(move == 9) status = `Match is draw!`;
    else status = `Next Player is ${xIsNext ? 'X': 'O'}`;
  
    return (
      <>
        <div className='status'>{status}</div>
        <div className='board-row'>{renderSquares(0)}</div>
        <div className='board-row'>{renderSquares(3)}</div>
        <div className='board-row'>{renderSquares(6)}</div>
      </>
    )
}

function calculateWinner(squares) {
    let lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }
  