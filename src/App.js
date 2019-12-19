import React from 'react';
import './App.css';
import Score from './scores/Score';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Score extraClass="main-score" value={10} length={3}/>
        <Score extraClass="balls-played" value={1} length={1}/>
        <Score extraClass="high-score" value={9001} length={4}/>
      </div>
    </div>
  );
}

export default App;
