import React from "react";
import GeneralMovies from "../GeneralMovies/GeneralMovies";
import classes from "./PopularMovies.module.css";
const PopularMovies = (props) => {
  const basePopularUrl = "https://api.themoviedb.org/3/movie/popular";
  const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
  const API_KEY_MOVIE = "?api_key=d0a9ee76df15c9c8e455000b78e70a56";
  const API_KEY_SEARCH = "&api_key=d0a9ee76df15c9c8e455000b78e70a56";

  return (
    <div className={classes.container}>
      <GeneralMovies
        isSearched={false}
        baseNotSearchedUrl={basePopularUrl}
        baseMovieUrl={baseMovieUrl}
        API_KEY_MOVIE={API_KEY_MOVIE}
        API_KEY_SEARCH={API_KEY_SEARCH}
      />
    </div>
  );
};

export default PopularMovies;
