const playButton    = document.querySelector("#play");
const pauseButton   = document.querySelector("#pause");
const stopButton    = document.querySelector("#stop");
const refreshButton = document.querySelector("#refresh");

const minutesDom = document.querySelector("#minutes");
const secondsDom = document.querySelector("#seconds");
let sec = secondsDom.textContent;
let min = minutesDom.textContent;

let timerId;

playButton.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = setInterval(countdown, 1000);
});

pauseButton.addEventListener("click", () => {
    clearInterval(timerId);
});

stopButton.addEventListener("click", () => {
    clearInterval(timerId);
    min = 25;
    sec = 0;
    minutesDom.textContent = `${min}`;
    secondsDom.textContent = `0${sec}`;
});

refreshButton.addEventListener("click", () => {
    
});


function countdown(){
    // Countdown finished
    if (min === 0 && sec === 0){
        return;
    }

    sec -= 1;

    // Reset seconds to 59 (after a minute)
    if (sec === -1) {
        sec = 59;
        if (min !== 0) {
            min -= 1;
        }
        formatTime(min, minutesDom);
    } 
    formatTime(sec, secondsDom);
}

function formatTime(counter, domElement){
    if (counter < 10) {
        domElement.textContent = `0${counter}`;
    } else {
        domElement.textContent = counter;
    }
}