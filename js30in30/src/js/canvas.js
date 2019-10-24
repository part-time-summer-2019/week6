const canvas = document.querySelector('#draw');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#BADA55';

// The shape of the end of the line
ctx.lineJoin = 'round';

// The shape of when a line meets another line
ctx.lineCap = 'round';

// ctx.globalCompositeOperation = 'difference';

ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if (!isDrawing) {
        return;
    }

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.beginPath();

    // start from
    ctx.moveTo(lastX, lastY);

    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;

    if (hue >= 360) {
        hue = 0;
    }

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    direction ? ctx.lineWidth++ : ctx.lineWidth--;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', (e) => isDrawing = false);
canvas.addEventListener('mouseout', (e) => isDrawing = false);