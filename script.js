const coverImg = document.getElementById('cover'),
      songName = document.getElementById('song-name'),
      authorEl = document.getElementById('author'),
      currentTimeEl = document.getElementById('current-time'),
      durationEl = document.getElementById('duration'),
      songProgress = document.getElementById('song'),
      progress = document.getElementById('song-play'),
      //BUTTONS
      backwardBtn = document.getElementById('backward'),
      forwardBtn = document.getElementById('forward'),
      playBtn = document.getElementById('play'),
      pauseBtn = document.getElementById('pause');

const songs = [
  {
    name: 'Lost in the City Lights',
    author: 'Cosmo Sheldrake',
    cover: 'img/cover-1.png',
    path: 'songs/song-lost.mp3'
  },
  {
    name: 'Forest Lullaby',
    author: 'Lesfm',
    cover: 'img/cover-2.png',
    path: 'songs/song-forest.mp3'
  }
];

let isPlaying = false;
let currentSong = 0;
let audio = new Audio();

function toggleMusic(){
  if(isPlaying){
    pauseMusic();
  }else{
    playMusic();
  }
}

function playMusic(){
  isPlaying = true;
  pauseBtn.style.display = 'block';
  playBtn.style.display = 'none';

  pauseBtn.setAttribute('title', 'Pause');
  audio.play();
}
function pauseMusic(){
  isPlaying = false;
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'block';

  playBtn.setAttribute('title', 'Play');
  audio.pause();
}

function loadMusic(song){
  coverImg.src = song.cover;
  songName.textContent = song.name;
  authorEl.textContent = song.author;
  audio.src = song.path;

}
function changeMusic(direction){
  if(direction === 1){
    currentSong = (currentSong + 1) % songs.length;
  }else if(direction === -1){
    currentSong = (currentSong + -1 + songs.length) % songs.length;
  }
  loadMusic(songs[currentSong]);
  playMusic();
}
let currentTime;
let duration;
function progressBarTime(){
  const {duration, currentTime} = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time)=>{
    return String(Math.floor(time)).padStart(2, '0');
  }
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

}
function setProgressBar(e){
  const width = songProgress.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
  playMusic();
}

playBtn.addEventListener('click', toggleMusic);
pauseBtn.addEventListener('click', toggleMusic);
backwardBtn.addEventListener('click', ()=> changeMusic(-1));
forwardBtn.addEventListener('click', ()=> changeMusic(1));
songProgress.addEventListener('click', setProgressBar);
audio.addEventListener('ended',()=> changeMusic(1));
audio.addEventListener('timeupdate', progressBarTime);

loadMusic(songs[currentSong]);
