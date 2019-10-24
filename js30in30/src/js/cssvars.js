function changeEventHandler(e) {

    let suffix = this.dataset.suffix || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

document.querySelectorAll('.controls input')
    .forEach(input => {
        input.addEventListener('change', changeEventHandler);

        if (input.type === 'range') {
            input.addEventListener('mousemove', changeEventHandler);
        }
    });