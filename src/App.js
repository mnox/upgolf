import React, {useState} from 'react';
import './App.css';
import Score from './scores/Score';

const io = require('socket.io-client');

function App() {

    const socket = io.connect('http://localhost:9001');

    socket.on('game:update', function (data) {
        setMainScore(data.currentScore);
        setHighScore(data.highScore);
        setBallsPlayed(data.ballsPlayed);
    });

    let [mainScore, setMainScore] = useState(0);
    let [ballsPlayed, setBallsPlayed] = useState(0);
    let [highScore, setHighScore] = useState(0);
  return (
    <div className="App">
      <div className="main-container">
        <Score extraClass="main-score" value={mainScore} length={3}/>
        <Score extraClass="balls-played" value={ballsPlayed} length={1}/>
        <Score extraClass="high-score" value={highScore} length={3}/>
      </div>
    </div>
  );
}

export default App;
