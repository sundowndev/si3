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
    defaultVolume: 15
}, data.films);

/* variables */
var lang = '';
var filter = 'all';

var categoryList = document.querySelector('.categoryList');
categoryList.innerHTML = '';

categoryList.innerHTML += '<li class="items"><a href="#" class="filter-btn active" data="all">Tous</a></li>';

data.categories.forEach(function(e){
    categoryList.innerHTML += '<li class="items"><a href="#" class="filter-btn" data="'+e+'">'+e+'</a></li>';
});

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

var searchBar = document.querySelector('.searchBar');

closeModalBtn.addEventListener('click', function(e){
    e.preventDefault();
    closeModal();
    
    voteSaved = false;
    note = 0;
    voteMsg.textContent = '';
    
    film = {};
    video.stop();
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
        
        if(filter == 'all' || filter == e.category){
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
    
    var videoInfos = {};
    
    data.films.forEach(function(el){
        if(el.id == id){
            videoInfos = el;
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
    
    filmTitle.textContent = videoInfos.title;
    filmTime.textContent = videoInfos.duration;
    filmType.textContent = videoInfos.category;
    filmAuthorText.textContent = videoInfos.author;
    filmAuthor.href = videoInfos.author_url;
    filmYear.textContent = videoInfos.year;
    filmDesc.textContent = videoInfos.description;
    filmNote.textContent = videoInfos.rating;
    
    filmDon.addEventListener('click', function(){
        if(this.classList.contains('subscribed')){
            this.classList.remove('subscribed');
            this.innerHTML = '<i class="ion-heart"></i> S\'abonner';
        }else{
            this.classList.add('subscribed');
            this.innerHTML = '<i class="ion-checkmark"></i> Abonné';
        }
    });
    
    video.set(videoInfos.id, videoInfos.src);
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
                marks[i].setAttribute("class", "markUser ion-ios-star");
            }
        }
    });

    marks[i].addEventListener('mouseout', function(e){
        if(voteSaved === false){
            for(var i = 0; i < note; i++){
                marks[i].classList.remove('active');
                marks[i].setAttribute("class", "markUser ion-ios-star-outline");
            }
        }
    });
    
    marks[i].addEventListener('click', function(e){
        if(voteSaved === false){
            voteSaved = true;
            note = e.srcElement.getAttribute('data');

            for(var i = 0; i < note; i++){
                marks[i].classList.add('active');
                marks[i].setAttribute("class", "markUser ion-ios-star");
            }
            
            voteMsg.textContent = 'Note enregistrée !';
        }
    });
}

/* search bar */
searchBar.addEventListener('input', async function(){
    if(this.value !== ''){
       search = this.value.toUpperCase();
        
       if(movieContainer.innerHTML != ''){
            imgContainer = document.querySelectorAll('.imgContainer');

            imgContainer.forEach(function(els){
                els.classList.add('hidden');
            });

            await sleep(300);
        }

        movieContainer.innerHTML = '';

        data.films.forEach(function(e){
            if (e.title.toUpperCase().indexOf(search) > -1) {
                if(filter == 'all' || e.category.toUpperCase() == filter.toUpperCase()){
                    var html = '<div class="imgContainer video-thumbnail hidden" data="'+e.id+'" style="background: url(./data/thumbnails/'+e.id+'.jpg);"><div class="overlay" data="'+e.id+'"><span data="'+e.id+'">'+e.title+'</span></div></div>';

                    movieContainer.innerHTML += html;
                }
            }
        });
        
        if(movieContainer.innerHTML == ''){
            movieContainer.innerHTML = '<p class="icon">Aucun résulat trouvé.</p>';
        }else{
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
    }else{
        setThumbnails(data.films);
    }
});