const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//pass in name of serial/COM port as node arg
const portName = process.argv[2];
const port = new SerialPort(portName, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));


//WEB SERVER
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
});

io.on('connection', function (socket) {
    app.socket = socket;
    socket.emit('game:connected', { hello: 'world' });
    socket.on('dispenseBall', () => {
        recordScore(0);
    });
    console.log('New socket connection');
});


//GAME LOGIC
var highScore = 0;
var currentScore = 0;
var ballsPlayed = 0;
var maxBalls = 9;

function sendGameUpdate() {
    let data = {highScore, currentScore, ballsPlayed};
    console.log('Game update data:');
    console.dir(data);
    app.socket.emit('game:update', data);
}

function recordScore(value) {
    console.log('recording score');
    currentScore += value;
    highScore = highScore > currentScore ? highScore : currentScore;
    ballsPlayed ++;
    if(ballsPlayed <= maxBalls) {
        dispenseBall();
    } else {
        resetGame();
    }

    sendGameUpdate();
}

function dispenseBall() {
    console.log('dispensing ball');
    port.write('B\r');
}

function resetGame() {
    currentScore = 0;
    ballsPlayed = 0;
}

function recordRandomScore() {
    let eventNumber = Math.floor(Math.random() * Math.floor(4));
    let eventString = `H${eventNumber.toString()}`;
    console.log(eventString);
    let eventFunc = Events[eventString];
    if(typeof app.socket !== 'undefined') {
        eventFunc();
    }
}

const Events = {
    H0 : () => recordScore(100),
    H1 : () => recordScore(100),
    H2 : () => recordScore(50),
    H3 : () => recordScore(25),
    H4 : () => recordScore(10),
    B  : () => ballDispensed(),
};

port.on("open", () => {
    console.log('Serial Port opened');
});
parser.on('data', data =>{
    //parse data into event
    let eventCode = data.slice(0,2);
    let eventFunc = Events[eventCode];
    if(typeof eventFunc === 'function') {
        eventFunc();
    }
});

server.listen(9001);