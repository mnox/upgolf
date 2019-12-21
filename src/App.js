import React, {Component} from 'react';
import './App.css';
import Score from './scores/Score';
import Background from './background/Background';

const io = require('socket.io-client');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeLayers: ['primary'],
            mainScore       : 0,
            ballsPlayed     : 0,
            highScore       : 0,
        };


        this.socket = io.connect('http://localhost:9001');
        this.socket.on('game:update', data => {
            this.setState(data);
            this.shake();
        });

        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    render() {
        return (
            <div className="App">
                <div className="main-container">
                    <Background activeLayers={this.state.activeLayers}/>
                    <Score extraClass="main-score" value={this.state.mainScore} length={3}/>
                    <Score extraClass="balls-played" value={this.state.ballsPlayed} length={1}/>
                    <Score extraClass="high-score" value={this.state.highScore} length={3}/>
                </div>
            </div>
        );
    }

    handleKeyUp(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        if(event.which === 32) {
            this.sendDispenseBallRequest();
        }
    }

    sendDispenseBallRequest() {
        console.log('sending dispense ball request');
        this.socket.emit('dispenseBall');
    }

    shake() {
        setTimeout(()=> this.setState({activeLayers:['secondary']}), 300);
        setTimeout(()=> this.setState({activeLayers:['tertiary']}), 600);
        setTimeout(()=> this.setState({activeLayers:['secondary']}), 900);
        setTimeout(()=> this.setState({activeLayers:['tertiary']}), 1200);
        setTimeout(()=> this.setState({activeLayers:['primary']}), 1500);
    }

}

export default App;
