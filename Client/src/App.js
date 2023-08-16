import React from "react";
//import logo from './logo.svg';
import './App.css';

import { Route, Routes } from "react-router-dom";

import Board from "./components/board";
import Create from "./components/create";
import HighScore from "./components/highScoreList";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Board />} />
        <Route path="/highScoreList" element={<HighScore />} />
       <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  ); 
 };

 export default App;