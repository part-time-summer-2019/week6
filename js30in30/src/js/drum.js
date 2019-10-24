

addEventListener('keydown', (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

    if (!audio) {
        return;
    }
    audio.currenTime = 0; // rewind it to the beginning to allow continuous playing
    audio.play();

    const div = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    div.classList.add('playing');
}, false);

let removeStyle = (e) => {
    if (e.propertyName !== 'transform') {
        return;
    }

    const div = e.currentTarget;
    div.classList.remove('playing');
};

const keys = document.querySelectorAll(".key")
keys.forEach(key => key.addEventListener('transitionend', removeStyle));