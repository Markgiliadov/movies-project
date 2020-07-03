import React from "react";
import GeneralMovies from "./GeneralMovies/GeneralMovies";
const Movies = (props) => {
  const baseSearchUrl = "https://api.themoviedb.org/3/search/movie?query=";
  const baseMovieUrl = "https://api.themoviedb.org/3/movie/";
  const API_KEY_MOVIE = "?api_key=d0a9ee76df15c9c8e455000b78e70a56";
  const API_KEY_SEARCH = "&api_key=d0a9ee76df15c9c8e455000b78e70a56";

  return (
    <GeneralMovies
      {...props}
      isSearched
      baseSearchUrl={baseSearchUrl}
      baseMovieUrl={baseMovieUrl}
      API_KEY_MOVIE={API_KEY_MOVIE}
      API_KEY_SEARCH={API_KEY_SEARCH}
    />
  );
};
export default Movies;
