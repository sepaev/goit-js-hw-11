const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}
let timer;
refs.startBtn.addEventListener('click', start)
refs.stopBtn.addEventListener('click', stop)
refs.stopBtn.disabled = true;
colorBtn(refs.stopBtn, 'lightgray', 'darkgray');

// Starting
function start() {
  if (!timer) {
    timer = setInterval(changeBgColor, 1000);
    refs.startBtn.disabled = true;
    colorBtn(refs.startBtn, 'lightgray', 'darkgray');
    refs.stopBtn.disabled = false;
    colorBtn(refs.stopBtn, 'lightcoral', 'lightgreen');
  }
  changeBgColor();
}

function colorBtn(obj, bgColor, textColor) {
    obj.style.backgroundColor = bgColor;
    obj.style.color = textColor;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBgColor() {
      refs.body.style.backgroundColor = getRandomHexColor();
}

// Stopping

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  refs.startBtn.disabled = false;
      colorBtn(refs.startBtn, 'lightgreen', 'lightcoral');
  refs.stopBtn.disabled = true;
colorBtn(refs.stopBtn, 'lightgray', 'darkgray');
}