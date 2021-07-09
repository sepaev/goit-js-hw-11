const refs = {
    buttons: document.querySelector('.promis1__buttons'),
    result: document.querySelector('.promis1__result'),
    form: document.querySelector('.promis1__form')
}
let promise;
// отображаю кнопки
function addButtons(n) {
    let htmlTxt = '';
    for (i = 0; i < n; i++) {
        let number = Math.floor(Math.random() * (8000 - 1000)) + 1000;
        htmlTxt += `<button>${number}</button>`;
    }
    refs.buttons.innerHTML = htmlTxt;
}
addButtons(Math.random() * 10);

// клик по кнопкам
refs.buttons.addEventListener('click', buttonClick);

function buttonClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== "BUTTON") return;
    const time = Number(e.target.innerText)
    delay(time);
    refs.result.innerHTML = `The program is working. ${time / 1000} sec left`;
        refs.result.style.backgroundColor = 'white';
}

// функция delay()
function delay(ms) {
    const isSuccess = true;
    
    promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                resolve(ms);
            } else {
                reject("Error! Error passed to reject function");
            }
        }, ms);
    });
    
    promise.then(
      value => {
        logger(value)
      },
      error => {
        console.log("onReject call inside promise.then()");
        console.log(error); // "Error! Error passed to reject function"
      }
    );
};


function logger(time) {
    console.log(`Fulfilled after ${time}ms`);
    refs.result.innerHTML = `Fulfilled after ${time}ms`;
    refs.result.style.backgroundColor = 'green';
}