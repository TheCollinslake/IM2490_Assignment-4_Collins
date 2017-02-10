

document.addEventListener("DOMContentLoaded", function()
     {console.log("Initializing the video player.");
     startVideoPlayer();
     }, false);

function startVideoPlayer() {
    videoPlayer= document.getElementById("video");
    videoPlayer.controls = false;
    console.log("Video element's controls now disabled.");
    loadVideo("Predator");
    videoPlayer.addEventListener("timeupdate", updateProgressBar,false);
}

function loadVideo(name) {
    videoPlayer.src = "videos/" + name + ".mp4";

    var bar = document.getElementsByTagName('progress')[0];
    bar.value = 0;

    setPoster(name);
    
    videoPlayer.load();
}

function setPoster(name) {
    var posterPath = "posters/" + name + ".jpg";
    videoPlayer.poster = posterPath;
}

function togglePlayPause() {
    var button = document.getElementById("play-pause-btn");
    
    var video = videoPlayer.src;
    
    if(videoPlayer.paused || videoPlayer.ended) {
        changeButton(button, "pause");
        videoPlayer.play();
        
        console.log(video + "video now playing.");
    } else {
        changeButton(button, "play");
        videoPlayer.pause();
        console.log(video + "video paused.");
    }
}

function changeButton(btn, value) {
    btn.innerHTML = value.capitalize();
    btn.title = value.capitalize();
    btn.className = value;
}

String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function stopVideo() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    
    var button = document.getElementById("play-pause-btn");
    changeButton(button, "play");
    
    var poster = videoPlayer.attributes[2].value;
    console.log("poster var: " + poster);
    var posterPath = poster.split('/');
    var posterName = posterPath[1].split('.');
    var posterFileName = posterName[0];
    console.log("Poster file name: " + posterFileName);
    
    setPoster(posterFileName);
    videoPlayer.load();
    
    console.log("Video stopped.");
}

function toggleMute() {
    var btn = document.getElementById("mute-btn");

    if(videoPlayer.muted) {
        changeButton(btn, "mute");
        videoPlayer.muted = false;

        console.log("Audio now un-muted.");
    } else {
        changeButton(btn, "un-mute");
        videoPlayer.muted = true;

        console.log("Audio now muted.")
    }
}


function videoSpeed(dir, amt) {
    var pbr = videoPlayer.playbackRate;
    var pbr_lower_btn = document.getElementById("rewind-btn");

    (pbr < 0) ? pbr_lower_btn.disabled = true : pbr_lower_brn.disabled = false;

    if (dir == "slower") {
        videoPlayer.playbackRate -= amt;
    } else if(dir == "faster") {
        videoPlayer.playebackRate += amt;
    }
    console.log("New playback rate: " + videoPlayer.playbackRate + ".");

}

function changeVolume() {
    videoPlayer.volume = document.getElementById("volume").value;
    console.log("Volume changed to" + videoPlayer.volume);

}

function fullScreen() {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen){
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    } else {
        alert("Sorry, your browser doesn't support full-screen videos")
    }
console.log("Trying to go to full-screen mode.");

}

function updateProgressBar() {
    var bar = document.getElementsByTagName('progress')[0];
    var percentComplete = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
    bar.value = percentComplete;
    document.getElementById("precent").innerHTML = '% Complete: ' + percentComplete + '%';
}