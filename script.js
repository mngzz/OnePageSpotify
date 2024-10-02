const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const audioProgress = document.getElementById("audioProgress");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");

playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    audioPlayer.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

audioPlayer.addEventListener("loadedmetadata", () => {
  totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  audioProgress.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  audioProgress.style.background = `linear-gradient(to right, #56255c ${audioProgress.value}%, #ffffff80 ${audioProgress.value}%)`;
});

audioProgress.addEventListener("input", () => {
  const value = audioProgress.value;
  const duration = audioPlayer.duration;
  audioPlayer.currentTime = (value / 100) * duration;
  audioProgress.style.background = `linear-gradient(to right, #56255c ${value}%, #ffffff80 ${value}%)`;
});
