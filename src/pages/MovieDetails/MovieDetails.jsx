import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails, getMovieVideos } from '../../api/tmdb';
import './moviedetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await getMovieDetails(id);
      setMovie(movieData);

      // 🔥 Save to Recently Watched
      if (movieData.poster_path) {
        const history = JSON.parse(localStorage.getItem('viewedMovies')) || [];
        const alreadyExists = history.find((m) => m.id === movieData.id);

        if (!alreadyExists) {
          history.unshift({
            id: movieData.id,
            title: movieData.title,
            poster_path: movieData.poster_path,
          });

          localStorage.setItem('viewedMovies', JSON.stringify(history.slice(0, 10)));
          console.log('Saved to Recently Watched:', movieData.title);
        }
      }

      // 🎬 Get Trailer
      const videos = await getMovieVideos(id);
      const trailer = videos.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h2>{movie.title}</h2>

      <p className="overview">{movie.overview}</p>

      <p><strong>Release Date:</strong> {movie.release_date}</p>

      <div className="rating">
        <strong>Rating:</strong> {movie.vote_average}
        <div className="stars">
          {Array.from({ length: Math.round(movie.vote_average / 2) }).map((_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
      </div>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
      )}

      {trailerKey && (
        <div className="trailer-section">
          <h3>Trailer</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
