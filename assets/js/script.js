function capture(){
    var canvas = document.getElementById('can');
    var video = document.getElementById('videoPlayer');
    canvas.getContext('2d').drawImage(video, 0, 0, 1280, 720);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* initialisation du player video */
var video = new videoPlayer('.player', {
    // Parameters
    autoplay: false,
    loop: false,
    defaultVolume: 60
}, data.films);

/* variables */
var lang = '';
var filter = 'all';

var filters_btn = document.querySelectorAll('.filter-btn');

var movieContainer = document.querySelector('.movieContainer');
var imgContainer = '';

var videos_thumbnails = document.querySelector('.video-thumbnail');

var modal = document.querySelector('.modal');

var closeModalBtn = document.querySelector('.closeModal');

var voteSaved = false;
var note = 0;
var voteMsg = document.querySelector('p.voteMsg');

var film = {};

closeModalBtn.addEventListener('click', function(e){
    e.preventDefault();
    closeModal();
    
    voteSaved = false;
    note = 0;
    voteMsg.textContent = '';
    
    film = {};
});

filters_btn.forEach(function(els){
    els.addEventListener('click', function(e){
        e.preventDefault();
        
        if(els.getAttribute('data') != filter){
            var length = filters_btn.length;
            
            for (var i = 0; i < length; i++) {
                   filters_btn[i].classList.remove('active');
            }
            
            filter = els.getAttribute('data');
            els.classList.add('active');

            setThumbnails(data.films);
        }
    });
});

setThumbnails(data.films);

async function setThumbnails(element) {
    if(movieContainer.innerHTML != ''){
        imgContainer = document.querySelectorAll('.imgContainer');
        
        imgContainer.forEach(function(els){
            els.classList.add('hidden');
        });
        
        await sleep(300);
    }
    
    movieContainer.innerHTML = '';
    
    element.forEach(function(e){
        var html = '<div class="imgContainer video-thumbnail hidden" data="'+e.id+'" style="background: url(./data/thumbnails/'+e.id+'.jpg);"><div class="overlay" data="'+e.id+'"><span data="'+e.id+'">'+e.title+'</span></div></div>';
        
        if(filter == 'all'){
            movieContainer.innerHTML += html;
        }else if(filter == 'action' && e.category == 'Action'){
            movieContainer.innerHTML += html;
        }else if(filter == 'horror' && e.category == 'Horror / Thriller'){
            movieContainer.innerHTML += html;
        }else if(filter == 'animation' && e.category == 'Animation'){
            movieContainer.innerHTML += html;
        }else if(filter == 'comedy' && e.category == 'Comedy'){
            movieContainer.innerHTML += html;
        }
    });
    
    await sleep(300);
    
    imgContainer = document.querySelectorAll('.imgContainer');
    
    imgContainer.forEach(function(els){
        els.classList.remove('hidden');
    });
    
    var videos_thumbnails = document.querySelectorAll('.video-thumbnail');
        
    videos_thumbnails.forEach(function(els){
        els.addEventListener('click', function(e){
            openModal(e.srcElement.getAttribute('data'));
        });
    });
}

/* Open modal */
async function openModal(id){
    document.body.style.overflow = 'hidden';
    modal.style.display = 'initial';
    
    for(var i = 0; i < marks.length; i++){
        marks[i].classList.remove('active');
    }
    
    await sleep(100);
    
    modal.style.opacity = 1;
    
    var video = {};
    
    data.films.forEach(function(el){
        if(el.id == id){
            video = el;
        }
    });
    
    filmTitle = document.querySelector('.filmTitle');
    filmTime = document.querySelector('.filmTime');
    filmDon = document.querySelector('.don');
    filmType = document.querySelector('.filmType');
    filmAuthorText = document.querySelector('.filmAuthor');
    filmAuthor = document.querySelector('.filmAuthor');
    filmYear = document.querySelector('.filmYear');
    filmDesc = document.querySelector('.filmDescription');
    filmNote = document.querySelector('.filmNote');
    
    filmTitle.textContent = video.title;
    filmTime.textContent = video.duration;
//    film.don.textContent = '';
    filmType.textContent = video.category;
    filmAuthorText.textContent = video.author;
    filmAuthor.href = video.author_url;
    filmYear.textContent = video.year;
    filmDesc.textContent = video.description;
    filmNote.textContent = video.rating;
}

/* Close modal */
async function closeModal(){
    modal.style.opacity = 0;
    
    await sleep(300);
    
    document.body.style.overflow = '';
    modal.style.display = 'none';
}

/* Vote */
var marks = document.querySelectorAll('.markUser');

for(var i = 0; i < marks.length; i++){
    marks[i].addEventListener('mouseover', function(e){
        if(voteSaved === false){
            note = e.srcElement.getAttribute('data');

            for(var i = 0; i < note; i++){
                marks[i].classList.add('active');
                marks[i].setAttribute("class", "markUser ion-android-star");
            }
        }
    });

    marks[i].addEventListener('mouseout', function(e){
        if(voteSaved === false){
            for(var i = 0; i < note; i++){
                marks[i].classList.remove('active');
                marks[i].setAttribute("class", "markUser ion-android-star-outline");
            }
        }
    });
    
    marks[i].addEventListener('click', function(e){
        if(voteSaved === false){
            voteSaved = true;
            note = e.srcElement.getAttribute('data');

            for(var i = 0; i < note; i++){
                marks[i].classList.add('active');
                marks[i].setAttribute("class", "markUser ion-android-star");
            }
            
            voteMsg.textContent = 'Note enregistrée !';
        }
    });
}

//video.set('a5dMxYp');