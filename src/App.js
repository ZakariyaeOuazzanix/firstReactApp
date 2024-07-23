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
  const [TheWinner, setTheWinner] = useState(null);
  const [history, SetHistory] = useState([Array(9).fill(null)]); /*empty array as the first value*/
  const [moveItems, SetMoveItems] = useState([]);


  function MovesList(){
    /*loop over the moveItems and display them*/
    return (
      history.map((Board, idx) => {
        if(idx === 0){
          <li key={idx}>
            <button onclick={setSquares(Array(9).fill(null))}>Go to game start</button>
          </li>
        }
        <li key={idx}>
          <button onclick={
            () =>{
              setSquares(Board)
              if(idx %2 ==0) setXIsNext(true)
              else setXIsNext(false);
            }
            }>
              Go to move #{idx}</button>
        </li>
      })
    );
    }

    /* if he moves while the board isn't at its latest state, we should erase the states before the current one in history, and therefore the movesList
    will update accordingly, and we should check for xIsNext (the board we are on is it pair or unpair) 
    */ 


  function handleClick(square){

    if(isBoardEmpty()){
      if(history.length == 1) createGoToGameStartBtn();
      else {
        const newHistory = history.slice(0,1);
        SetHistory(newHistory);
      }
    }


    if(!squares[square] && !TheWinner){

      if(squares !== history[history.length -1]){
        const lastIdxToKeep = history.indexOf(squares);
        const newHistory = history.slice(0,lastIdxToKeep +1);
      }

      const nextSquares = squares.slice();
      if(xIsNext) nextSquares[square] = "X";
      else nextSquares[square] = "O";
      const newHistory = [...history, nextSquares]
      SetHistory(newHistory);
      if(!isBoardEmpty()) addMove();
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      CalculateWinner(nextSquares);
      if (TheWinner) console.log(`The winner is ${TheWinner}`);
    }

  }

  return (
    <>
  <div className="game">
        
    <div>
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
    </div>

    <div className="game-info">
      <ol id="moves-list">
        <MovesList />
      </ol>
    </div>

  </div>

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

  function addMove(){

    const movesList =  document.getElementById('moves-list');
    const newItem = document.createElement('li');
    const button = document.createElement('button');
    const lastIdx = history.length -1
    button.textContent = `Go to move #${lastIdx}`;
    button.onclick = () => {
      setSquares(history[lastIdx]);
    };
    newItem.appendChild(button);
    movesList.appendChild(newItem);

  }

  function isBoardEmpty(){
    return JSON.stringify(squares)  === JSON.stringify(Array(9).fill(null)) ;
  }

  function createGoToGameStartBtn(){
    const btn = document.createElement('button');
    btn.onclick = () => {
      setSquares(Array(9).fill(null));
    };
    btn.textContent = "Go to Game Start";
    const firstItem = document.createElement('li');
    firstItem.appendChild(btn);
    const movesList = document.getElementById('moves-list');
    movesList.appendChild(firstItem);
  }
}