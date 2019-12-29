






//alright let's get started with the search when the user click on the button

submitBtn.onclick = function (event) {
    event.preventDefault();
    search.innerHTML = '';
    if(userInput.value.length != 0){
        searchMovies(userInput)
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

    userInput.value = '';
    }else{
        search.innerHTML = `<h1 class="white-text text-center">Please Enter someting to search</h1>`
    }
    
}


//function to fetch video information

const getVideo = async (movie_id)=>{
    const moviesUrl = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`;
    const resp = await fetch(moviesUrl);
    const data = resp.json();
    return data;
}



//next button on the movies section
const scrollingLeft = document.querySelector('.next');
const scrollingRight = document.querySelector('.back');

scrollingLeft.addEventListener( 'click',(e)=>{
    console.log(search.offsetWidth)
    search.scrollLeft += (search.offsetWidth);
})
scrollingRight.addEventListener('click', ()=>{
    search.scrollLeft += -(search.offsetWidth);
})

