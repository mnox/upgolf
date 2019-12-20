import React, {useState} from 'react';
import './App.css';
import Score from './scores/Score';
import Background from './background/Background';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:9001');

function sendDispenseBallRequest() {
    socket.emit('dispenseBall');
}

function shake(callback) {
    setTimeout(()=> callback(['secondary']), 300);
    setTimeout(()=> callback(['tertiary']), 600);
    setTimeout(()=> callback(['secondary']), 900);
    setTimeout(()=> callback(['tertiary']), 1200);
    setTimeout(()=> callback(['primary']), 1500);
}

function App() {
    document.addEventListener('keyup', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        if(event.which === 32) {
            sendDispenseBallRequest();
        }
    });

    socket.on('game:update', function (data) {
        shake(setActiveLayers);
        console.log('Game Update:');
        console.dir(data);
        setMainScore(data.currentScore);
        setHighScore(data.highScore);
        setBallsPlayed(data.ballsPlayed);
    });

    let [mainScore, setMainScore] = useState(0);
    let [ballsPlayed, setBallsPlayed] = useState(0);
    let [highScore, setHighScore] = useState(0);
    let [activeLayers, setActiveLayers] = useState(['primary']);

  return (
    <div className="App">
      <div className="main-container">
          <Background activeLayers={activeLayers}/>
        <Score extraClass="main-score" value={mainScore} length={3}/>
        <Score extraClass="balls-played" value={ballsPlayed} length={1}/>
        <Score extraClass="high-score" value={highScore} length={3}/>
      </div>
    </div>
  );
}

export default App;
