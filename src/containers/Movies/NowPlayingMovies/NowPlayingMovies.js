import React from "react";
import GeneralMovies from "../GeneralMovies/GeneralMovies";
// import classes from "./PopularMovies.module.css";

const NowPlayingMovies = (props) => {
  const baseNowPlayingMovieUrl =
    "https://api.themoviedb.org/3/movie/now_playing";
  const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
  const API_KEY_MOVIE = "?api_key=d0a9ee76df15c9c8e455000b78e70a56";
  const API_KEY_SEARCH = "&api_key=d0a9ee76df15c9c8e455000b78e70a56";
  return (
    <GeneralMovies
      isSearched={false}
      baseNotSearchedUrl={baseNowPlayingMovieUrl}
      baseMovieUrl={baseMovieUrl}
      API_KEY_MOVIE={API_KEY_MOVIE}
      API_KEY_SEARCH={API_KEY_SEARCH}
    />
  );
};

export default NowPlayingMovies;
