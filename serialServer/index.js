const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
//pass in name of serial/COM port as node arg
const portName = process.argv[2];
const port = new SerialPort(portName, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

let highScore, currentScore, ballsPlayed = 0;
let maxBalls = 9;

function recordScore(value) {
    clearTimeout(noScoreTimeout);
    currentScore += value;
    highScore = highScore > currentScore ? highScore : currentScore;
    ballsPlayed ++;
    if(ballsPlayed < maxBalls) {
        dispenseBall();
    } else {
        resetGame();
    }
}

let noScoreTimeout = null;

function dispenseBall() {
    port.write('B\n');
    noScoreTimeout = () => {
        recordScore(0);
    }
}

function resetGame() {
    currentScore = 0;
    ballsPlayed = 0;
}

const Events = {
    H0 : recordScore(100),
    H1 : recordScore(100),
    H2 : recordScore(50),
    H3 : recordScore(25),
    H4 : recordScore(10),
};

port.on("open", () => {
    console.log('Serial Port opened');
});
parser.on('data', data =>{
    //parse data into event
    let eventCode = data;
    let eventFunc = Events[eventCode];
    if(typeof eventFunc === 'function') {
        eventFunc();
    }
});