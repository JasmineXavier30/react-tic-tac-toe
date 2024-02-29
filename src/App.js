import { useState } from 'react';
import Board from './components/Board';

export default function Game() {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  //Storing history of moves
  function handleStoreHistory(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1)
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  //Rendering Go to #move buttons
  const moves = history.map((squares, move) => {
    let desc;
    if(move > 0) desc = `Go to #${move}`;
    else desc = `Go to Game Start`;
    if(move && move == currentMove) return (<li>You are at #{move}</li>)
    else return (<li><button onClick={()=>jumpTo(move)}>{desc}</button></li>)
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onStoreHistory={handleStoreHistory} move={currentMove}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}