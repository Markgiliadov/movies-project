import React, { Component } from "react";
// import Button from "../../components/Button/Button";
import classes from "./Movies.module.css";
import GeneralMovies from "./GenericMovies/GeneralMovies";
// import Rating from "../../components/Movie/Rating/Rating";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseSearchUrl: "https://api.themoviedb.org/3/search/movie?query=",
      baseMovieUrl: "https://api.themoviedb.org/3/movie/",
      API_KEY_MOVIE: "?api_key=d0a9ee76df15c9c8e455000b78e70a56",
      API_KEY_SEARCH: "&api_key=d0a9ee76df15c9c8e455000b78e70a56",
      movies: [],
      movies_ids: [],
      showMovies: true,
      inputEntered: false,
      searchInput: "",
    };
  }

  // presentPopularMovies = () => {
  //   this.fetchingMovies("", true);
  // };
  // presentPlayingNow = () => {
  //   this.fetchingMovies();
  // };

  render() {
    return (
      <GeneralMovies
        // className={classes.Movies}
        isSearched
        baseSearchUrl={this.state.baseSearchUrl}
        baseMovieUrl={this.state.baseMovieUrl}
        API_KEY_MOVIE={this.state.API_KEY_MOVIE}
        API_KEY_SEARCH={this.state.API_KEY_SEARCH}
      />
      // >
      //   <h1>Your Movies are:</h1>
      // </GenericMovies>
    );
  }
}
export default Movies;
