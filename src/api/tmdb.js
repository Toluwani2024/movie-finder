import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return res.data;
};

export const getMovieVideos = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};
export const getTopRatedMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const getTrendingTVShows = async () => {
  const res = await axios.get(`${BASE_URL}/trending/tv/week`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};
