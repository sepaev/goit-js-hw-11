const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body')
}
function  start() {
    refs.body.style.backgroundColor = getRandomHexColor()
}
refs.startBtn.addEventListener('click', start)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
