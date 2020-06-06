import React from "react";
import GeneralMovies from "../GenericMovies/GeneralMovies";
// import classes from "../PopularMovies/PopularMovies.module.css";

const UpcomingMovies = (props) => {
  const baseUpcomingUrl = "https://api.themoviedb.org/3/movie/upcoming";
  const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
  const API_KEY_MOVIE = "?api_key=d0a9ee76df15c9c8e455000b78e70a56";
  const API_KEY_SEARCH = "&api_key=d0a9ee76df15c9c8e455000b78e70a56";
  return (
    <GeneralMovies
      isSearched={false}
      baseNotSearchedUrl={baseUpcomingUrl}
      baseMovieUrl={baseMovieUrl}
      API_KEY_MOVIE={API_KEY_MOVIE}
      API_KEY_SEARCH={API_KEY_SEARCH}
    />
  );
};

export default UpcomingMovies;
