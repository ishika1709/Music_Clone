console.log('Welcome')

//Variables
let songindex = 0; // index of song being played
let AudioElement = new Audio('Saiyaara.mp3'); // mp3 path for current song
let MasterPlay = document.getElementById('MasterPlay'); // footer play
let gif = document.getElementById('gif'); // banner gif
let songitems = Array.from(document.getElementsByClassName('songItem')); // list item
let playitems = Array.from(document.getElementsByClassName('play')); // mini list play
// console.log(playitems);
let ProgressBar = document.getElementById('progressbar'); // progressbar
// songs info
let songs = [{
        songName: "Saiyaara",
        filepath: "songs/Saiyaara.mp3",
        coverpath: "covers/Saiyaara.jpg",
        Singers: "Mohit Chauhan, Taraannum Malik",
        Duration: "4:12",
    },
    {
        songName: "Zinda",
        filepath: "songs/Zinda.mp3",
        coverpath: "covers/Zinda.jpg",
        Singers: "Sunidhi Chauhan",
        Duration: "4:00",
    },
    {
        songName: "Challa",
        filepath: "songs/Challa.mp3",
        coverpath: "covers/Challa.jpg",
        Singers: "A.R. Rahman, Rabbi Shergil, Gulzar",
        Duration: "5:20",
    },
    {
        songName: "Thunder - Imagine Dragons",
        filepath: "songs/Thunder - Imagine Dragons.mp3",
        coverpath: "covers/Thunder - Imagine Dragons.jpg",
        Singers: "Imagine Dragons",
        Duration: "3:07",
    },
    {
        songName: "Supne Ni Saun Dinde",
        filepath: "songs/Supne Ni Saun Dinde.mp3",
        coverpath: "covers/Supne Ni Saun Dinde.jpg",
        Singers: "Prabh Bains",
        Duration: "4:14",
    },
    {
        songName: "Sufna Banke",
        filepath: "songs/Sufna Banke.mp3",
        coverpath: "covers/Sufna Banke.jpg",
        Singers: "Harvi",
        Duration: "2:59",
    },
    {
        songName: "Tu Hai Ki Nahi",
        filepath: "songs/Tu Hai Ki Nahi.mp3",
        coverpath: "covers/Tu Hai Ki Nahi.jpg",
        Singers: "Ankit Tiwari",
        Duration: "5:34",
    }
]

//List Display
songitems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByClassName('cover')[0].src = songs[i].coverpath;
    element.getElementsByClassName('SongName')[0].innerHTML = songs[i].songName;
    element.getElementsByClassName('duration')[0].innerHTML = songs[i].Duration;
})

//Opertion of Master(Footer) Pause/Play
MasterPlay.addEventListener('click', () => {
    if (AudioElement.paused || AudioElement.currentTime <= 0) {
        AudioElement.play(); //play current mp3 file
        MasterPlay.classList.remove('fa-circle-play'); //replace play with pause
        MasterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1; // banner gif visible
        document.getElementsByClassName(`${songindex}`)[0].style.opacity = 1; //list gif visible
        document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-play'); // replace list play with pause
        document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-pause');
    } else {
        AudioElement.pause(); // pause current song
        MasterPlay.classList.add('fa-circle-play'); // replace pause with play
        MasterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0; //hide banner gif
        document.getElementsByClassName(`${songindex}`)[0].style.opacity = 0; //hide list gif
        document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-play'); //replace list pause with play
        document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-pause');
    }
})

//List Play/Pause Buttons Control
playitems.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target, i);
        if (songindex == i) {
            //current song is being paused/played
            if (AudioElement.paused || AudioElement.currentTime <= 0) {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                AudioElement.src = songs[i].filepath;
                AudioElement.play();
                MasterPlay.classList.remove('fa-circle-play');
                MasterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
                document.getElementsByClassName('songname')[0].innerHTML = songs[i].songName;
                document.getElementsByClassName('singers')[0].innerHTML = songs[i].Singers;
                document.getElementsByClassName('Songpic')[0].src = songs[i].coverpath;
                document.getElementsByClassName(`${i}`)[0].style.opacity = 1;
            } else {
                e.target.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                AudioElement.pause();
                MasterPlay.classList.add('fa-circle-play');
                MasterPlay.classList.remove('fa-circle-pause');
                gif.style.opacity = 0;
                document.getElementsByClassName(`${i}`)[0].style.opacity = 0;
            }
        } else {
            //another song is being requested to play
            //Pause current song(last played song) first
            document.getElementsByClassName(`${songindex}`)[0].style.opacity = 0;
            document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-play');
            document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-pause');
            songindex = i; //upadate current song
            if (AudioElement.paused || AudioElement.currentTime <= 0) {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                AudioElement.src = songs[i].filepath;
                AudioElement.play();
                MasterPlay.classList.remove('fa-circle-play');
                MasterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
                document.getElementsByClassName('songname')[0].innerHTML = songs[i].songName;
                document.getElementsByClassName('singers')[0].innerHTML = songs[i].Singers;
                document.getElementsByClassName('Songpic')[0].src = songs[i].coverpath;
                document.getElementsByClassName(`${i}`)[0].style.opacity = 1;
            } else {
                e.target.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                AudioElement.pause();
                MasterPlay.classList.add('fa-circle-play');
                MasterPlay.classList.remove('fa-circle-pause');
                gif.style.opacity = 0;
                document.getElementsByClassName(`${i}`)[0].style.opacity = 0;
            }
        }
    })
})

// ProgressBar Control
AudioElement.addEventListener('timeupdate', () => {
    progress = parseInt((AudioElement.currentTime / AudioElement.duration) * 100);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', () => {
    AudioElement.currentTime = ProgressBar.value * AudioElement.duration / 100;
})

//Next Button Control
document.getElementById('next').addEventListener('click', () => {
    //pause current song
    document.getElementsByClassName(`${songindex}`)[0].style.opacity = 0;
    document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-pause');
    if (songindex >= 6) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    document.getElementsByClassName(`${songindex}`)[0].style.opacity = 1;
    AudioElement.src = songs[songindex].filepath;
    AudioElement.currentTime = 0;
    AudioElement.play();
    MasterPlay.classList.add('fa-circle-pause');
    MasterPlay.classList.remove('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-pause');
    document.getElementsByClassName('songname')[0].innerHTML = songs[songindex].songName;
    document.getElementsByClassName('singers')[0].innerHTML = songs[songindex].Singers;
    document.getElementsByClassName('Songpic')[0].src = songs[songindex].coverpath;
})

//Previous Button Control
document.getElementById('last').addEventListener('click', () => {
    document.getElementsByClassName(`${songindex}`)[0].style.opacity = 0;
    document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-pause');
    if (songindex <= 0) {
        songindex = 0;
    } else {
        songindex -= 1;
    }
    document.getElementsByClassName(`${songindex}`)[0].style.opacity = 1;
    AudioElement.src = songs[songindex].filepath;
    AudioElement.currentTime = 0;
    AudioElement.play();
    MasterPlay.classList.add('fa-circle-pause');
    MasterPlay.classList.remove('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.remove('fa-circle-play');
    document.getElementsByClassName(`p${songindex}`)[0].classList.add('fa-circle-pause');
    document.getElementsByClassName('songname')[0].innerHTML = songs[songindex].songName;
    document.getElementsByClassName('singers')[0].innerHTML = songs[songindex].Singers;
    document.getElementsByClassName('Songpic')[0].src = songs[songindex].coverpath;
})