const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const second = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("minute")[0];
const msec = document.getElementsByClassName("msec")[0];
const laps = document.querySelector(".laps");
const lapsClearButton = document.querySelector(".laps-clear");

let isPlaying = false;
let secCounter = 0;
let minCounter = 0;
let msecCounter = 0;
let interval;

const toggleButtons = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlaying) {
        playButton.innerHTML = 'Pause';
        interval = setInterval(() => {
            msecCounter++;
            if (msecCounter === 100) {
                msecCounter = 0;
                secCounter++;
            }
            if (secCounter === 60) {
                secCounter = 0;
                minCounter++;
            }
            msec.innerHTML = msecCounter < 10 ? `0${msecCounter}` : msecCounter;
            second.innerHTML = secCounter < 10 ? `0${secCounter}:` : `${secCounter}:`;
            minute.innerHTML = minCounter < 10 ? `0${minCounter}:` : `${minCounter}:`;
        }, 10);
        isPlaying = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(interval);
        isPlaying = false;
    }
    toggleButtons();
};

const reset = () => {
    // Only reset the stopwatch, do not clear laps
    clearInterval(interval);
    isPlaying = false;
    playButton.innerHTML = 'Play';
    minCounter = 0;
    secCounter = 0;
    msecCounter = 0;
    minute.innerHTML = "00:";
    second.innerHTML = "00:";
    msec.innerHTML = "00";
};

const recordLap = () => {
    const lapTime = `${minute.innerHTML}${second.innerHTML}${msec.innerHTML}`;
    const lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `<span class="number">#${laps.children.length + 1}</span><span class="time-stamp">${lapTime}</span>`;
    laps.appendChild(lapItem);
    lapsClearButton.classList.remove("hidden");
};

const clearLaps = () => {
    laps.innerHTML = "";
    lapsClearButton.classList.add("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);
lapsClearButton.addEventListener("click", clearLaps);
