function videoPlayer(player, options, data) {
    this.player = document.querySelector(player);
    this.options = options;
    
    /* Adding additional params */
    this.options.index = 0;
    this.options.current_timeline = '00:00';
    this.options.timeline = '00:00';
    this.options.playing = false;
    
    /* Init the player */
    /* Play button */
    var pButton = document.querySelector('.playButton');
    
    /* Timeline */
    var timeline = document.querySelector('.time');
    
    /* timer element */
    var timer = document.querySelector('div');
    
    //this.player.innerHTML = '<div></div>';
//    var videoTag = document.createElement('video');
//    this.player.appendChild(videoTag);
//    videoTag.preload = 'auto';
//    
//    var mainDiv = document.createElement('div');
//    mainDiv.classList.add('mainDiv');
//    this.player.appendChild(mainDiv);
//    
//    /* Play button */
//    var pButton = document.createElement('button');
//    pButton.classList.add('pButton');
//    mainDiv.appendChild(pButton);
//    pButton.innerHTML = 'play';
//    
//    /* Timeline element */
//    var timeline = document.createElement('div');
//    timeline.classList.add('timeline');
//    mainDiv.appendChild(timeline);
//    
//    var progress = document.createElement('div');
//    progress.classList.add('progress');
//    timeline.appendChild(progress);
//    
//    var loaded = document.createElement('div');
//    loaded.classList.add('loaded');
//    timeline.appendChild(loaded);
//    
//    /* Song duration element */
//    var timer = document.createElement('div');
//    timer.classList.add('timer');
//    mainDiv.appendChild(timer);
//    
//    /* Volume control element */
//    var volumeControl = document.createElement('div');
//    volumeControl.classList.add('volumeControl');
//    this.player.appendChild(volumeControl);
    
    /* Create the audio object */
    var video = document.querySelector('#videoPlayer');
    
    /* functions */
    this.set = function(id){
        this.options.index = id;
        video.src = './data/'+id;
        video.load();
    }
    
    var play = function(){
        video.play();
        pButton.innerHTML = '&#9612;&#9612;';
    }
    
    var pause = function(){
        video.pause();
        pButton.innerHTML = '&#9654;';
    }
    
    this.stop = function(){
        video.pause();
        video.currentTime = 0;
        options.playing = false;
    }
    
    var prev = function(){
        if(options.songList.indexOf(options.songList[options.index]) != 0){
            options.index -= 1;
            this.setSong(options.index);
            this.stop();
            
            if(options.playing === true){
                this.play();
            }else{
                this.stop();
            }
        }else if(options.playing === false){
            this.stop();
        }
    }
    
    var next = function(){
        if(options.songList.indexOf(options.songList[options.index]) != options.songList.length - 1){
            options.index += 1;
            this.setSong(options.index);
            this.pause();
            
            if(options.playing === true){
                this.play();
            }else{
                this.pause();
            }
        }else{
            this.stop();
        }
    }
    
    var setVolume = function(vol){
        video.volume = vol * 0.01; // round 100 to 1
    }
    
    var getCurrentTimerPourcentage = function(){
        //audio.currentTime/audio.duration
        //timeline.style.width = '40%';
    }
    
    var getCurrentTimerSec = function(){
        //audio.currentTime/audio.duration
        timeline.style.width = '40%';
    }
    
    var setDuration = function(duration){
        var minutes = "0" + Math.floor(duration / 60);
        var seconds = "0" + (Math.floor(duration) - minutes * 60);
        options.timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    var setCurrentTimer = function(currentTime){
        var minutes = "0" + Math.floor(currentTime / 60);
        var seconds = "0" + (Math.floor(currentTime) - minutes * 60);
        options.current_timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    var refreshTimer = function(){
        setCurrentTimer(video.currentTime);
        
        //timer.innerHTML = '<span class="played">'+this.options.current_timeline+'</span> / <strong class="duration">'+this.options.timeline+'</strong>';
    }
    
    //this.setSong(this.options.index);
    setVolume(this.options.defaultVolume);
    
    video.addEventListener('canplay', function() {
        setDuration(video.duration);
        refreshTimer();
    });
    
    /* Using params */
    if(this.options.autoplay === true){
        this.play();
    }
    
    /* triggering elements */
    pButton.addEventListener('click', function(){
        if(options.playing === false){
            play();
            options.playing = true;
        }else{
            pause();
            options.playing = false;
        }
    });
    
    timeline.addEventListener('click', function(){
        //mettre à jour progress bar en fonction du clic
        //maj le timer
        //console.log('test1');
    });
    
    video.addEventListener("playing", function(){
        options.playing = true;
    });
    
    video.addEventListener("timeupdate", function(){
        refreshTimer();
    });
    
    video.addEventListener("ended", function(){
        if(options.loop === true && options.songList.indexOf(options.songList[options.index]) == options.songList.length - 1){
            play();
        }else{
            next();
        }
    });
}