import React, { useState } from "react";
import GeneralMovies from "../GenericMovies/GeneralMovies";
// import classes from "../PopularMovies/PopularMovies.module.css";

const UpcomingMovies = (props) => {
  const [state, setState] = useState({
    baseUpcomingUrl: "https://api.themoviedb.org/3/movie/upcoming",
    baseMovieUrl: "https://api.themoviedb.org/3/movie/",
    API_KEY_MOVIE: "?api_key=d0a9ee76df15c9c8e455000b78e70a56",
    API_KEY_SEARCH: "&api_key=d0a9ee76df15c9c8e455000b78e70a56",
  });
  return (
    <GeneralMovies
      isSearched={false}
      baseNotSearchedUrl={state.baseUpcomingUrl}
      baseMovieUrl={state.baseMovieUrl}
      API_KEY_MOVIE={state.API_KEY_MOVIE}
      API_KEY_SEARCH={state.API_KEY_SEARCH}
    />
  );
};

export default UpcomingMovies;
