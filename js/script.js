const api = "http://localhost:8000/api/v1/titles/";

async function getDataBestMovie() {
    try {
        const bestTitle = document.getElementById('Best-movie-title');
        const bestDescription = document.getElementById('best-movie-description');
        const bestImage = document.querySelector('.best-movie-img img');
        const moreInfoButton = document.getElementById('best-info-btn');

        const response = await fetch(`${api}?sort_by=-imdb_score`);
        const { results } = await response.json();
        
        const bestMovieUrl = results[0].url;

        const movieResponse = await fetch(bestMovieUrl);
        const movieData = await movieResponse.json();

        bestTitle.textContent = movieData.title;
        bestDescription.textContent = movieData.description;
        bestImage.src = movieData.image_url;

        moreInfoButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            openModal(movieData.id); 
        });

    } catch (error) {
        console.error(error);
    }
}

function openModal(movieId) {
    // Assuming you want to open the IMDb URL in a new window
    window.open(`https://www.imdb.com/title/tt${movieId}/`, '_blank', 'noopener,noreferrer');
}

getDataBestMovie();
