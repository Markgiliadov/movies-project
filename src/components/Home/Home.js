import React, { Component } from "react";
import PopularMovies from "../../containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "../../containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../containers/Movies/UpcomingMovies/UpcomingMovies";
import classes from "./Home.module.css";
class Home extends Component {
  state = {
    basePopularUrl: "https://api.themoviedb.org/3/movie/popular",
    baseMovieUrl: "https://api.themoviedb.org/3/movie/",
    API_KEY_MOVIE: "?api_key=d0a9ee76df15c9c8e455000b78e70a56",
    API_KEY_SEARCH: "&api_key=d0a9ee76df15c9c8e455000b78e70a56",
  };
  render() {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Upcoming Movies</h1>
        <UpcomingMovies />
        <h1 style={{ textAlign: "center" }}>Popular Movies</h1>
        <PopularMovies />
        <h1 style={{ textAlign: "center" }}>Now Playing Movies</h1>
        <NowPlayingMovies />
      </>
    );
  }
}

export default Home;
