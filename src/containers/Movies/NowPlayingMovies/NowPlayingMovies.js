import React, { useState } from "react";
import GeneralMovies from "../GenericMovies/GeneralMovies";
// import classes from "./PopularMovies.module.css";

const NowPlayingMovies = (props) => {
  const [state, setState] = useState({
    baseNowPlayingMovieUrl: "https://api.themoviedb.org/3/movie/now_playing",
    baseMovieUrl: "https://api.themoviedb.org/3/movie/",
    API_KEY_MOVIE: "?api_key=d0a9ee76df15c9c8e455000b78e70a56",
    API_KEY_SEARCH: "&api_key=d0a9ee76df15c9c8e455000b78e70a56",
  });
  return (
    <GeneralMovies
      isSearched={false}
      baseNotSearchedUrl={state.baseNowPlayingMovieUrl}
      baseMovieUrl={state.baseMovieUrl}
      API_KEY_MOVIE={state.API_KEY_MOVIE}
      API_KEY_SEARCH={state.API_KEY_SEARCH}
    />
  );
};

export default NowPlayingMovies;
