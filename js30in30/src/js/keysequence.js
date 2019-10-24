

const pressed = [];
const secretcode = 'nikhilrocks';

document.addEventListener('keyup', (e) => {
    pressed.push(e.key);

    pressed.splice(-secretcode.length -1, pressed.length - secretcode.length);

    if (pressed.join('').includes(secretcode)) {
        console.log('DING DING !');
    }
});