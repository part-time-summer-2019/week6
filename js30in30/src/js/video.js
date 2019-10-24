// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');


// Build functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    // Do it here rather than in the togglePlay function
    // This way, regardless of how the video is played (i.e. what source triggers the play/pause)
    // The button's state is updated accordingly.
    // Also provides separation of duties. The togglePlay() function handle's the one task of
    // playing/paysing the video, while this function handle's one task of updating the button
    // depending on whether the video is playing or paused.
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    const skipAmount = parseFloat(this.dataset.skip);
    video.currentTime += skipAmount;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullScreen() {
    video.requestFullscreen();
}



// Event listeners
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

fullScreen.addEventListener('click', toggleFullScreen);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);