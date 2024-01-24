let isRunning = false;
let elapsedTime = 0;
let laps = [];
let currentLapStart = 0;

function displayTime(elapsedTime) {
    document.getElementById('elapsedTime').innerText = formatTime(elapsedTime);
}

function displayStatus(isRunning) {
    const statusElement = document.getElementById('status');
    statusElement.innerText = isRunning ? 'Status: Running' : 'Status: Stopped';
    statusElement.style.color = isRunning ? '#4CAF50' : '#888';
}

function displayLaps(laps) {
    const lapsElement = document.getElementById('lapsTable');
    lapsElement.innerHTML = '';
    for (let i = 0; i < laps.length; i++) {
        const lapRow = lapsElement.insertRow(i);
        lapRow.insertCell(0).innerText = i + 1;
        lapRow.insertCell(1).innerText = formatTime(laps[i]);
    }
}

function updateLapsVisibility() {
    const lapsElement = document.getElementById('lapsTable');
    const lapsDiv = document.querySelector('.laps');
    
    lapsElement.style.display = laps.length > 0 ? 'table' : 'none';
    lapsDiv.style.display = laps.length > 0 ? 'block' : 'none';
}



function start() {
    isRunning = true;
    currentLapStart = Date.now() - elapsedTime;
}

function stop() {
    isRunning = false;
}

function reset() {
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    currentLapStart = 0;
    displayLaps(laps); // Clear laps display on reset
    updateLapsVisibility(); // Update laps visibility on reset
}

function lap() {
    if (isRunning) {
        const currentLapTime = Date.now() - currentLapStart;
        laps.push(currentLapTime);
        currentLapStart = Date.now();
        displayLaps(laps);
        updateLapsVisibility(); // Update laps visibility on adding a lap
    }
}

function updateElapsedTime(deltaTime) {
    if (isRunning) {
        elapsedTime += deltaTime;
    }
}

function updateView() {
    displayTime(elapsedTime);
    displayStatus(isRunning);
    updateLapsVisibility();
}

function formatTime(milliseconds) {
    const totalMilliseconds = milliseconds;
    const minutes = Math.floor(totalMilliseconds / (60 * 1000));
    const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
    const millisecondsPart = totalMilliseconds % 1000;

    const formattedTime = pad(minutes) + ':' + pad(seconds) + ':' + pad(millisecondsPart, 3);
    return formattedTime;
}

function pad(num, length = 2) {
    return num.toString().padStart(length, '0');
}

// Event Listeners
document.getElementById('startButton').addEventListener('click', start);
document.getElementById('stopButton').addEventListener('click', stop);
document.getElementById('resetButton').addEventListener('click', reset);
document.getElementById('lapButton').addEventListener('click', lap);

// Timer
setInterval(function () {
    updateElapsedTime(100);
    updateView();
}, 100);
