function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }
      
    return true;
  } else { 
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }
      
    return false;
  }  
}

function videoPlayer(player, options, data) {
    var parent = this;
    this.player = document.querySelector(player);
    this.options = options;
    
    /* Adding additional params */
    this.options.index = 0;
    this.options.current_timeline = '00:00';
    this.options.timeline = '00:00';
    this.options.playing = false;
    this.options.isFullscreen = false;
    
    /* Init the player */
    /* Play button */
    var pButton = document.querySelector('.playButton');
    
    /* Timeline */
    var timeline = document.querySelector('.timeRange');
    
    /* timer element */
    var timer = document.querySelector('.timer');
    
    /* fullscreen button */
    var fullscreen = document.querySelector('.fullscreenButton');
    
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
        pButton.innerHTML = '<img class="pauseImg" src="data/playerButtons/pause-button.png">';
    }
    
    var pause = function(){
        video.pause();
        pButton.innerHTML = '<img class="playImg" src="data/playerButtons/play-arrow.png">';
    }
    
    this.stop = function(){
        video.pause();
        video.currentTime = 0;
        options.playing = false;
    }
    
    var prev = function(){
//        if(options.songList.indexOf(options.songList[options.index]) != 0){
//            options.index -= 1;
//            this.setSong(options.index);
//            this.stop();
//            
//            if(options.playing === true){
//                this.play();
//            }else{
//                this.stop();
//            }
//        }else if(options.playing === false){
//            this.stop();
//        }
    }
    
    var next = function(){
//        if(options.songList.indexOf(options.songList[options.index]) != options.songList.length - 1){
//            options.index += 1;
//            this.setSong(options.index);
//            this.pause();
//            
//            if(options.playing === true){
//                this.play();
//            }else{
//                this.pause();
//            }
//        }else{
//            this.stop();
//        }
    }
    
    var setVolume = function(vol){
        video.volume = vol * 0.01; // round 100 to 1
    }
    
    var getCurrentTimerPourcentage = function(currentTime){
        pourcentage = currentTime*100/video.duration;
        
        return pourcentage;
    }
    
    var getCurrentTimerSec = function(pourcentage){
        video.currentTime = pourcentage*video.duration/100;
    }
    
    var setDuration = function(duration){
        var minutes = "0" + Math.floor(duration / 60);
        var seconds = "0" + (Math.floor(duration) - minutes * 60);
        options.timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    var setCurrentTimer = function(currentTime){
        var minutes = "0" + Math.floor(currentTime / 60);
        var seconds = "0" + (Math.floor(currentTime) - minutes * 60);
        parent.options.current_timeline = minutes.substr(-2) + ":" + seconds.substr(-2);
    }
    
    var refreshTimer = function(){
        setCurrentTimer(video.currentTime);
        
        timer.innerHTML = '<span class="currentTime">'+parent.options.current_timeline+'</span><span class="totalTime">'+parent.options.timeline+'</span>';
        
        timeline.value = getCurrentTimerPourcentage(video.currentTime);
    }
    
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
    
    timeline.addEventListener('click', function(e){
        getCurrentTimerSec(e.toElement.value);
    });
    
    video.addEventListener("playing", function(){
        options.playing = true;
    });
    
    video.addEventListener("timeupdate", function(){
        refreshTimer();
    });
    
    video.addEventListener("ended", function(){
        //ended
    });
    
    fullscreen.addEventListener('click', function(e){
        if(parent.isFullscreen){
            parent.isFullscreen = false;
            parent.player.classList.remove('fullscreen');
            e.innerHTML = '<img class="fullImg" src="data/playerButtons/full-size.png">';
        }else{
            parent.isFullscreen = true;
            parent.player.classList.add('fullscreen');
            e.innerHTML = '<img class="noFullscreen" src="data/playerButtons/" alt="">';
        }
        
        toggleFullScreen();
    });
    
    document.addEventListener('keydown', function(e){
        /* if key is space bar */
        if(e.keyCode == 32){
            if(parent.options.playing === false){
                play();
                parent.options.playing = true;
            }else{
                pause();
                parent.options.playing = false;
            }
        }
        
        if(e.keyCode == 27 && parent.isFullscreen){
            parent.player.classList.remove('fullscreen');
            parent.isFullscreen = false;
        }
    });
}