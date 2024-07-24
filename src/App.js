import { useState } from "react";



export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [winner, setWinner] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(history[history.length -1]);


  function onPlayFct(nextSquares){
    const newHistory = [...history, nextSquares];
    setHistory(newHistory);
    setXIsNext(!xIsNext);
    calculateWinner(nextSquares);
    setCurrentBoard(nextSquares);
  }

  function jumpTo(board, idx){
    setCurrentBoard(board);
    const newXIsNext = idx %2 ==0 ? true : false;
    console.log(newXIsNext);
    setXIsNext(newXIsNext);
  }

  function deleteBeforeHistory(){
    const lastIdxToKeep = history.indexOf(currentBoard);
    const newHistory = history.slice(0, lastIdxToKeep +1);
    setHistory(newHistory);
  }

  /*
  const nextPlayer = xIsNext ? "X" : "O";
  console.log(nextPlayer);
  const status = winner ? `Winner : ${winner}` : `Next player : ${nextPlayer}`;*/
  const moves = history.map((board, idx) => {
    let description;
    if(idx ==0){
      description = "go to Game Start";
    }
    else{
      description = `Go to move #${idx}`;
    }
    return(
        <li key={idx}>
          <button onClick={() => jumpTo(board, idx)}>{description}</button>
        </li>
    );
  });
    


  return (
    <div className="game">
      <div>
        <div className="status">
          {winner ? `Winner : ${winner}` : `Next player : ${xIsNext ? 'X' : 'O'}`}
        </div>
        <Board squares={currentBoard} xIsNext={xIsNext} onPlayArg={onPlayFct} winnerArg={winner} deleteBeforeHistory={deleteBeforeHistory} lastHistory={history[history.length -1]}/>
      </div>

      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }
  }

}

/*function Moves(gameHistory){

  const moves = gameHistory.map((board, idx) => 
  <li key={idx}>
    <button>Go to move #{idx}</button>
  </li>
);
  <ol>
   {moves}
  </ol>
}*/

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({squares, xIsNext, onPlayArg, winnerArg, lastHistory, deleteBeforeHistory}) {

  function handleClick(squareClicked) {
    /*if the current board 'squares' isn't like the one in the last of history (pass it as arg?) then delete the history after the current board 
    and add the nextSquares to the history (it's already done below through the onPlayArg ?)  */ 
    if (squares[squareClicked] || winnerArg) {
      return;
    }

    if(squares !== lastHistory){
      console.log("deleted !");
      deleteBeforeHistory();
    }

    const nextSquares = squares.slice();
    nextSquares[squareClicked] = xIsNext ? "X" : "O";
    onPlayArg(nextSquares);
    
  }



  return (

    <>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
    </>

  );
}