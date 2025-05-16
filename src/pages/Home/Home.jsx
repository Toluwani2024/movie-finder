import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import {
  getTrendingMovies,
  getTopRatedMovies,
  getTrendingTVShows,
} from '../../api/tmdb';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
      setFeaturedMovie(trending[Math.floor(Math.random() * trending.length)]);

      setTopRatedMovies(await getTopRatedMovies());
      setTrendingTV(await getTrendingTVShows());
    };

    fetchAll();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  const renderSlider = (items, isTV = false) => (
    <Slider {...sliderSettings}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * (index % 6) }}
        >
          <Link to={isTV ? '#' : `/movie/${item.id}`} className="movie-card">
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={item.title || item.name}
            />
          </Link>
        </motion.div>
      ))}
    </Slider>
  );

  return (
    <div className="home">
      {featuredMovie && (
        <div
          className="hero-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <div className="hero-content">
            <h1>{featuredMovie.title}</h1>
            <p>{featuredMovie.overview.slice(0, 150)}...</p>
            <Link to={`/movie/${featuredMovie.id}`} className="watch-btn">
              ▶ Watch Now
            </Link>
          </div>
        </div>
      )}

      <h2 className="section-title">🔥 Trending Movies</h2>
      {renderSlider(trendingMovies)}

      <h2 className="section-title">⭐ Top Rated Movies</h2>
      {renderSlider(topRatedMovies)}

      <h2 className="section-title">📺 Trending TV Shows</h2>
      {renderSlider(trendingTV, true)}
    </div>
  );
};

export default Home;
