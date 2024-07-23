import { useState } from "react";

function Square({value, onSquareClick}){

  return(
    <button 
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
  ); 
  
}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); 
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [TheWinner, setTheWinner] = useState(null)

  function handleClick(square){
    if(!squares[square] && !TheWinner){
      const nextSquares = squares.slice();
      if(xIsNext) nextSquares[square] = "X";
      else nextSquares[square] = "O";
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      CalculateWinner(nextSquares)
      if (TheWinner) console.log(`The winner is ${TheWinner}`);
    }
  }

  return (
    <>
      <div className="status"> { !TheWinner ? ("Next player :" + (xIsNext ? "X" : "O")) : (`Winner : ${TheWinner}`) }  </div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>

      <button onClick={reset} className="reset-btn">Reset</button>
    </>
  );

  function reset(){
    setSquares(Array(9).fill(null));
    setTheWinner(null);
    console.clear();
  }

  function CalculateWinner(squares) {
    const winLines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let i in winLines){
      const [a,b,c] = winLines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
          setTheWinner(squares[a]);
        }
    }
  }
}