let isRunning = false;
let minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval;

const startStopBtn = document.getElementById("start-stop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const minuteDisplay = document.getElementById("minute");
const secondDisplay = document.getElementById("second");
const millisecondDisplay = document.getElementById("millisecond");
const lapsList = document.getElementById("laps-list");

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startStopBtn.textContent = "Pause";
        lapBtn.classList.remove("hidden");
        resetBtn.classList.remove("hidden");

        timerInterval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = "Start";
    }
}

function updateDisplay() {
    minuteDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + " :";
    secondDisplay.textContent = (seconds < 10 ? "0" : "") + seconds + " :";
    millisecondDisplay.textContent = (milliseconds < 100 ? "0" : "") + Math.floor(milliseconds / 10);
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${minuteDisplay.textContent} ${secondDisplay.textContent} ${millisecondDisplay.textContent}`;
        const li = document.createElement("li");
        li.classList.add("lap-item");
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    startStopBtn.textContent = "Start";
    lapsList.innerHTML = "";
    lapBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
}

startStopBtn.addEventListener("click", startStopwatch);
lapBtn.addEventListener("click", recordLap);
resetBtn.addEventListener("click", resetStopwatch);
