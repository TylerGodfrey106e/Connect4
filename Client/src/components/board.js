import React from "react";
//import logo from './logo.svg';
//import './App.css';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";



//import HighScoreList from "./components/highScoreList";

function Square({value, onSquareClick}) {
  const color = value === 'X' ? 'blue' : value === 'O' ? 'red': 'black';
  return (
    
    <button
      
      className={"square"}
      onClick={onSquareClick}
      style = {{color}}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [turnCount, setTurnCount] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(42).fill(null));
  let isFormHidden = true;

  const [form, setForm] = useState({
    name: "",
    moves: 0
  });
  const navigate = useNavigate();


  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault(); //prevents from doing what it normally does
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form }; //unpacking it
    console.log("form entered onsubmit")
  
    //
    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    setForm({ name: "", moves: 0});
    //setRecords({name: "", moves: 0})
    navigate("/highScoreList");
  }

  function calculateWinner(squares) {
    const lines = [
      // Horizontal wins
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20],
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],
      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34],
      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],
      // Vertical wins
      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [3, 10, 17, 24],
      [4, 11, 18, 25],
      [5, 12, 19, 26],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [15, 22, 29, 36],
      [16, 23, 30, 37],
      [17, 24, 31, 38],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],
      // Diagonal wins
      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],
      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [5, 11, 17, 23],
      [6, 12, 18, 24],
      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],
      [10, 16, 22, 28],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [13, 19, 25, 31],
      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],
      [17, 23, 29, 35],
      [18, 24, 30, 36],
      [19, 25, 31, 37],
      [20, 26, 32, 38]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]=== squares[d]) {
        return squares[a];
      }
    }
    return null;
  }

  function isTie(squares){
    if (squares.every((square)=> square !== null)){
      return true;
    }
    return false;
  }

  function handleClick(i) {
    //find an empty space in the column and set i to equal that space
    var temp = i % 7;
    while(temp < 42){
      if (squares[temp]){

      }
      else {
        i = temp;
        break;
      }
      temp = temp+7;
    }



    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    setTurnCount(turnCount+1);
    form.moves = form.moves+1;
    const nextSquares = squares.slice(); //gets a copy of the array
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //calculate winner/next player
  const winner = calculateWinner(squares);
  const tie = isTie(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    isFormHidden = false;
    
  } else if(tie) {
    status = "Tie";
  } else  {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  

  return (
    <>
    <body>
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[35]} onSquareClick={() => handleClick(35)} /> 
        <Square value={squares[36]} onSquareClick={() => handleClick(36)} />
        <Square value={squares[37]} onSquareClick={() => handleClick(37)} />
        <Square value={squares[38]} onSquareClick={() => handleClick(38)} /> 
        <Square value={squares[39]} onSquareClick={() => handleClick(39)} />
        <Square value={squares[40]} onSquareClick={() => handleClick(40)} />
        <Square value={squares[41]} onSquareClick={() => handleClick(41)} />
      </div>
      <div className="board-row">
        <Square value={squares[28]} onSquareClick={() => handleClick(28)} /> 
        <Square value={squares[29]} onSquareClick={() => handleClick(29)} />
        <Square value={squares[30]} onSquareClick={() => handleClick(30)} />
        <Square value={squares[31]} onSquareClick={() => handleClick(31)} /> 
        <Square value={squares[32]} onSquareClick={() => handleClick(32)} />
        <Square value={squares[33]} onSquareClick={() => handleClick(33)} />
        <Square value={squares[34]} onSquareClick={() => handleClick(34)} />
      </div>
      <div className="board-row">
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} /> 
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} />
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} />
        <Square value={squares[24]} onSquareClick={() => handleClick(24)} /> 
        <Square value={squares[25]} onSquareClick={() => handleClick(25)} />
        <Square value={squares[26]} onSquareClick={() => handleClick(26)} />
        <Square value={squares[27]} onSquareClick={() => handleClick(27)} />
      </div>
      <div className="board-row">
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} /> 
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} />
        <Square value={squares[16]} onSquareClick={() => handleClick(16)} />
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} /> 
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} />
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} />
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} />
      </div>
      <div className="board-row">
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} /> 
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} />
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} /> 
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} />
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} />
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} />
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> 
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      </div>
    </div>
      <div hidden={isFormHidden}>
       <form classname="nameForm">
          <label>Name</label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({name: e.target.value})}
          />
          <label>Total Moves: {turnCount}</label>
          <button onClick={onSubmit}>Submit</button>
        </form>
      </div>
      <NavLink className="nav-link" to="/highScoreList">
        <button>
          High Scores
        </button> 
      </NavLink>

    </body>
    </>
  ); //creates unnamed function
    
}