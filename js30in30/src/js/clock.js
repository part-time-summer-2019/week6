
initTime();
setInterval(secondsTickHandler, 1000);

function getIncrementalDegreeMovement(scale) {
    return 360 / scale;
}

let secondsDegrees = 0;
let minutesDegrees = 0;
let hoursDegrees = 0;

function initTime() {
    const date = new Date();

    secondsDegrees = date.getSeconds() * getIncrementalDegreeMovement(60);
    minutesDegrees = date.getMinutes() * getIncrementalDegreeMovement(60);
    hoursDegrees = date.getHours() * getIncrementalDegreeMovement(12);

    document.querySelector('.second-hand')
        .style.transform = `rotate(${secondsDegrees}deg)`;
    document.querySelector('.minute-hand')
        .style.transform = `rotate(${minutesDegrees}deg)`;
    document.querySelector('.hour-hand')
        .style.transform = `rotate(${hoursDegrees}deg)`;
}


function secondsTickHandler() {
    if (secondsDegrees == 0) {
        initTime();
    }

    const date = new Date();

    secondsDegrees += getIncrementalDegreeMovement(60);
    moveElement('.second-hand', secondsDegrees);

    if(date.getSeconds() == 0) {
        minutesDegrees += getIncrementalDegreeMovement(60);
        moveElement('.minute-hand', minutesDegrees);
    }

    if(date.getMinutes() == 0) {
        hoursDegrees += getIncrementalDegreeMovement(12);
        moveElement('.hour-hand', hoursDegrees);
    }
}

function moveElement(elementCSSSelector, rotationDegrees) {
    document.querySelector(elementCSSSelector)
        .style.transform = `rotate(${rotationDegrees}deg)`;
}
