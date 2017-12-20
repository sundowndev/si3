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
    
    var prev = function(){}
    
    var next = function(){}
    
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
        
        //var i = 3;
        
        //répèter:
        //set timeout i--; 3000ms
        //cacher le lecteur
        //si mouseover sur le player -> afficher le lecteur + i = 3;
    });
    
    video.addEventListener("ended", function(){
        //ended
    });
    
    fullscreen.addEventListener('click', launchFullscreen);
    
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
    
    // Fullscreen
    video.addEventListener('dblclick', launchFullscreen);

    function launchFullscreen(){
        if(parent.options.isFullscreen == false){
            fullscreen.innerHTML = '<img class="noFullscreen" src="data/playerButtons/ExitFullScreen.png">';
            
            launchIntoFullscreen();
            parent.options.isFullscreen = true;
        } else if (parent.options.isFullscreen == true){
            fullscreen.innerHTML = '<img class="fullImg" src="data/playerButtons/full-size.png">';
            
            exitFullscreen();
            parent.options.isFullscreen = false;
        }
    }

    if(document.addEventListener){
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);
    }

    function exitHandler(){
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null){
                document.querySelector('.player').classList.toggle('fullscreen');
            }
        }

    function launchIntoFullscreen() {
        if(document.querySelector('.player').requestFullscreen) {
            document.querySelector('.player').requestFullscreen();
        } else if(document.querySelector('.player').mozRequestFullScreen) {
            document.querySelector('.player').mozRequestFullScreen();
        } else if(document.querySelector('.player').webkitRequestFullscreen) {
            document.querySelector('.player').webkitRequestFullscreen();
        } else if(document.querySelector('.player').msRequestFullscreen) {
            document.querySelector('.player').msRequestFullscreen();
        }
    }

    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}