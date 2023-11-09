document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=5d13bfc0e471e40896f27bc9b3200e99&language=en-US&sort_by=popularity.desc'
      );
      const data = await response.json();
      renderMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const renderMovies = (movies) => {
    const container = document.createElement('div');
    container.className = 'container';

    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      container.appendChild(card);
    });

    rootElement.appendChild(container);

    // Initialize Darkmode after rendering movies
    initializeDarkmode();
  };

  const createMovieCard = (movie) => {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    image.alt = movie.title;

    const title = document.createElement('h3');
    title.textContent = movie.title;

    const rating = document.createElement('p');
    rating.textContent = `Rating: ${movie.vote_average}`;

    const loveButton = createButton('Love', 'love', () => handleButtonClick('Love', movie.id));

    const dislikeButton = createButton('Dislike', 'dislike', () => handleButtonClick('Dislike', movie.id));

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(rating);
    card.appendChild(loveButton);
    card.appendChild(dislikeButton);

    return card;
  };

  const createButton = (text, className, onClick) => {
    const button = document.createElement('button');
    button.className = `button ${className}`;
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  };

  const handleButtonClick = (action, movieId) => {
    console.log(`${action} clicked for movie with ID: ${movieId}`);
  };

  const initializeDarkmode = () => {
    const options = {
      bottom: '64px',
      right: '5px',
      left: 'unset',
      time: '3s',
      mixColor: '#fff',
      backgroundColor: '#fff',
      buttonColorDark: '#100f2c',
      buttonColorLight: '#fff',
      saveInCookies: false,
      label: '🌓',
      autoMatchOsTheme: true,
    };

    const darkmode = new Darkmode(options);
    darkmode.showWidget();
  };

  fetchData();
});
