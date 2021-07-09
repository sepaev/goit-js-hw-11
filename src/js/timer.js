import Swal from 'sweetalert2'

const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    startBtn: document.querySelector('button[data-start]'),
    timerDiv: document.querySelector('div.timer'), 
    calendar: document.querySelector('#date-selector')
}
let currentTime = Date.parse(new Date());
let timeInterval;
let timeLeft;
refs.startBtn.disabled = true;

const timeRemaining = endDate => {
    currentTime = Date.parse(new Date());
    if (endDate > currentTime) {
        timeLeft = endDate - currentTime;
        let calc = timeLeft / 1000;
        const seconds = Math.floor(calc % 60);
        calc = (calc - seconds )/60;
        const minutes = Math.floor(calc % 60);
        calc = (calc - minutes )/60;
        const hours = Math.floor(calc % 24);
        const days = (calc - hours )/24;
        // const days = Math.floor(calc % 24);
        return {timeLeft, days, hours, minutes, seconds};
    };
    return {timeLeft:0, days:0, hours:0, minutes:0, seconds:0} 
};
const toSpan = number => {
    const string = number.toString();
    if (number < 10) return `<p>0</p><p>${string[0]}</p>`;
    if (number < 100) return `<p>${string[0]}</p><p>${string[1]}</p>`;
    if (number < 1000) return `<p>${string[0]}</p><p>${string[1]}</p><p>${string[2]}</p>`;
    if (number < 10000) return `<p>${string[0]}</p><p>${string[1]}</p><p>${string[2]}</p><p>${string[3]}</p>`;
    Swal.fire({
        title: 'Error!',
        text: 'Please choose an earlier date',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
    refs.timerDiv.style.display = 'none';
            clearInterval(timeInterval);
        timeInterval = null;
}

const tick = () => {
    const getTimeRemaining = timeRemaining(refs.calendar.valueAsNumber-10800000);
    if (getTimeRemaining.timeLeft === 0) {
        clearInterval(timeInterval);
        timeInterval = null;
    };
    refs.days.innerHTML = toSpan(getTimeRemaining.days);
    refs.hours.innerHTML =  toSpan(getTimeRemaining.hours);
    refs.minutes.innerHTML =  toSpan(getTimeRemaining.minutes);
    refs.seconds.innerHTML =  toSpan(getTimeRemaining.seconds);
}


const startTimer = () => {
    if (timeInterval) return
    timeInterval = setInterval(tick, 1000);
    tick();
    refs.timerDiv.style.display = 'flex';
};

refs.startBtn.addEventListener('click', startTimer);

const unlockButton = () => {
    const currentCalValue = refs.calendar.valueAsNumber - 10800000
    console.log(currentCalValue + ' ' + currentTime);
    if (!currentCalValue) return
    if (currentCalValue > currentTime) {
    refs.startBtn.disabled = false;
} else {
    refs.startBtn.disabled = true;
    Swal.fire({
        title: 'Error!',
        text: 'Please choose a date in the future',
        icon: 'error',
        confirmButtonText: 'Ok'
    })
};
};

refs.calendar.addEventListener('change', unlockButton);