// DOM Selectors
const playButton    = document.querySelector("#play");
const pauseButton   = document.querySelector("#pause");
const stopButton    = document.querySelector("#stop");
const refreshButton = document.querySelector("#refresh");

const decreaseSessionMinutes    = document.querySelector("#session-decrease");
const sessionMinutes            = document.querySelector("#session-minutes");
const increaseSessionMinutes    = document.querySelector("#session-increase");

const decreaseBreakMinutes      = document.querySelector("#break-decrease");
const breakMinutes              = document.querySelector("#break-minutes");
const increaseBreakMinutes      = document.querySelector("#break-increase");

const minutesDom = document.querySelector("#minutes");
const secondsDom = document.querySelector("#seconds");

const pauseDom = document.querySelector("#pause-message");

const sound = document.querySelector("#meditation-bowl");


// Global variables
let sec = 0;
let min = sessionMinutes.textContent;
let pause = false;
let timerId;


// Event listeners
playButton.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = setInterval(countdown, 1000);
});

pauseButton.addEventListener("click", () => {
    clearInterval(timerId);
});

stopButton.addEventListener("click", () => {
    clearInterval(timerId);

    if (pause) {
        min = breakMinutes.textContent;
    } else {
        min = sessionMinutes.textContent;
    }

    sec = 0;

    formatTime(min, minutesDom);
    formatTime(sec, secondsDom);
});

refreshButton.addEventListener("click", () => {
    min = 25;
    sec = 0;

    sessionMinutes.textContent  = "25";
    breakMinutes.textContent    = "5";

    if (pause) {
        formatTime(breakMinutes.textContent, minutesDom);
    } else {
        formatTime(sessionMinutes.textContent, minutesDom);
    }

    secondsDom.textContent = "00";
});

decreaseSessionMinutes.addEventListener("click", () => {
    decrease(sessionMinutes);

    if (!pause){
        setDisplay(minutesDom, sessionMinutes);
    }
});

increaseSessionMinutes.addEventListener("click", () => {
    increase(sessionMinutes);

    if (!pause) {
        setDisplay(minutesDom, sessionMinutes);
    }
});

decreaseBreakMinutes.addEventListener("click", () => {
    decrease(breakMinutes);

    if(pause){
        setDisplay(minutesDom, breakMinutes);
    }
});

increaseBreakMinutes.addEventListener("click", () => {
    increase(breakMinutes);

    if(pause){
        setDisplay(minutesDom, breakMinutes);
    }
});


// Functions
function countdown(){
    // Countdown finished
    if (min === 0 && sec === 0){
        sound.play();

        if (pause === false) {
            min = breakMinutes.textContent;                   
            pause = true;               
        } else {
            min = sessionMinutes.textContent;                  
            pause = false;
        }
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

    if (pause) {
        pauseDom.textContent = "Breath";
    } else {
        pauseDom.textContent = "Focus";
    }
}

function formatTime(num, domElement){
    if (num < 10) {
        domElement.textContent = `0${num}`;
    } else {
        domElement.textContent = num;
    }
}

function decrease(dom){
    let number = Number(dom.textContent);

    if (number > 1){
        dom.textContent = number - 1;
    }
}

function increase(dom){
    let number = Number(dom.textContent);
    dom.textContent = number + 1;
}


function setDisplay(targetDom, settingDom){
    formatTime(settingDom.textContent, targetDom);
    min = settingDom.textContent;
}
