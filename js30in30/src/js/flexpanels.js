function toggleOpen() {
    // remove it from any other panel that is open
    let otherPanel = document.querySelector(".open");
    if (otherPanel && otherPanel !== this) {
        otherPanel.classList.toggle('open');
    }

    this.classList.toggle('open');
}

function toggleOpenActive(e) {
    if (e.propertyName === 'flex-grow') {
        this.classList.toggle('open-active')
    }
}


document.querySelectorAll('.panel')
        .forEach(panel => {
            panel.addEventListener('click', toggleOpen);
            panel.addEventListener('transitionend', toggleOpenActive);
        });