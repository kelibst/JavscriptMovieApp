//let's define some important things

const submitBtn = document.querySelector('#submit');
const userInput = document.querySelector('#userInput');
const search = document.querySelector('.search');

let include_adult = '&include_adult=false';
const moviesInfo = document.querySelector('.movies');
let movies;
const close = document.querySelector('.movies-close');
const video = document.querySelector('.videos');
const key = '8e881d3001ffa36e777bcaeddd53b26c';
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const adult = document.querySelector('#adult');


//Fetch the search item from  the api

const searchMovies = async (userInput) => {
    const base = 'https://api.themoviedb.org/3/search/movie?api_key=';

    if (adult.checked) {
        include_adult = '&include_adult=true';
    }
    userInput = userInput.value;

    const query = `${key}${include_adult}&query=${userInput.trim()}`;
    const resp = await fetch(base + query);
    const data = await resp.json();
    return data;
}


moviesInfo.addEventListener('click', (e) => {

    if (e.target.classList.value == 'movies-close') {

        moviesInfo.classList.remove('movies-closing')
        video.classList.add('hide')

    }
})

//get image and information related that was clicked

search.addEventListener('click', e => {

    movies.forEach(element => {


        const moviesInfoHtml = function (movies) {
            let html = `
    
    <p class="movies-close">X</p>
    <div class="movies-img">
        <img class="movies-img" src=${imgUrl + element.poster_path} data="movie-id=9844">
    </div>
    <div class="movies-info">
        <p class="movies-title">${element.original_title}</p>
    <p class="movies-release">${element.release_date}</p>
    <p class="movies-overview">${element.overview}</p>
    <div class="videos"></div>

    `;
            return html;
        }

        // create element to put videos on the page



        if (element.id == e.target.dataset.movieId) {
            moviesInfo.innerHTML = moviesInfoHtml(movies);
            video.innerHTML = ``;
            moviesInfo.classList.add('movies-closing');
            video.classList.remove('hide')
            location.href = '#search';

            getVideo(element.id)
                .then(data => {

                    let vids = data.results;
                    const length = vids.length > 4 ? 4 : vids.length;
                    for (let i = 0; i < length; i++) {

                        const iframer = function (vids) {
                            const iframeEle = document.createElement('iframe');
                            const vidElement = `https://www.youtube.com/embed/${vids[i].key}`;
                            iframeEle.src = vidElement;
                            iframeEle.width = 360;
                            iframeEle.height = 315;
                            iframeEle.allowFullscreen = true;
                            return iframeEle;
                        }

                        const iframe = iframer(vids)
                        //console.log(iframe)
                        video.appendChild(iframe);
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    });
})

//let's create the html and update the exiting html template with it

function movieHtml(movies) {
    const movieEle = document.createElement('div');


    const movieTemp = `
    <div class="search-card">
    ${movies.map((movie) => {

        if (movie.poster_path) {
            return `<img class="search-img" src=${imgUrl + movie.poster_path} data-movie-id=${movie.id}  />`
        }

    })}
</div>
    `
    movieEle.innerHTML = movieTemp;
    return movieEle;
}

//getting latest movies

const getLatestMovies = async () => {
    const newUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US
`
    const resp = await fetch(newUrl);
    const data = resp.json();

    return data;
}

getLatestMovies()
    .then(data => {
        movies = data.results;
        if(movies.length != 0){
         const movieBlock = movieHtml(movies);
         search.appendChild(movieBlock)
         document.querySelector('.next').classList.remove('hide');
         document.querySelector('.back').classList.remove('hide');
        }else{
         search.innerHTML = `<h1 class="white-text text-center">Please Enter someting to search</h1>`
        }
         
    
    }).catch(err => {
    console.log(err.message)
})