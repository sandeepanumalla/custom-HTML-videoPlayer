let player = document.querySelector(".player");
let video = player.querySelector(".viewer");
let toggle = document.querySelector('.toggle');
let skipButtons = document.querySelectorAll("[data-skip]")
let range = document.querySelectorAll(".player__slider");
let progress = document.querySelector(".progress");
let progressBar = document.querySelector('.progress__filled');

function togglePlay(){
    console.log("clicked");
    const method = video.paused ? 'play':'pause';
    video[method]();
  
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){

    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function scrub(e){
    const percentage = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = percentage;
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) *100;
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener("click",togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click',togglePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(button => button.addEventListener('click',skip));
range.forEach(button => button.addEventListener('change',handleRangeUpdate));
range.forEach(button => button.addEventListener('mousemove',handleRangeUpdate));
let mouseDown  = false;
progress.addEventListener('click',(e)=>scrub(e));
progress.addEventListener('mousemove',(e)=>mouseDown && scrub(e) );
progress.addEventListener('mousedown',()=>mouseDown = true);
progress.addEventListener('mouseup',()=>mouseDown = false);