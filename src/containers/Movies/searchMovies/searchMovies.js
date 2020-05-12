import React, { useState } from "react";
import Movie from "../../../components/Movie/Movie";
import SearchBar from "../../../components/Searchbar/Searchbar";
const SearchMovies = (props) => {
  const [stateMovies, setStateMovies] = useState([]);
  const [inputEntered, setInputEntered] = useState(false);
  const searchMovies = async (searchInput) => {
    let movieUrl = "";
    let myMovies = [];
    let id_info = [];
    let urlString = "";
    if (searchInput !== "") {
      urlString = props.baseSearchUrl.concat(searchInput, props.API_KEY_SEARCH);
      console.log("url " + urlString + "inp is: " + searchInput);
      await fetch(urlString) // need to give urlString
        .then((res) => res.json())
        .then((json) => {
          for (const [i, result] of json.results.entries()) {
            id_info[i] = result.id;
          }
        })
        .catch((error) => console.log(error));
      console.log("i am here" + id_info);
      for (const [i, id] of id_info.entries()) {
        movieUrl = props.baseMovieUrl + id + props.API_KEY_MOVIE;
        console.log(movieUrl);
        myMovies[i] = await fetch(movieUrl)
          .then(async (res) => await res.json())
          .then(async (json) => await json);
      }
      setStateMovies(myMovies);
      setInputEntered(true);
    }
  };

  const handleChange = (event) => {
    searchMovies(event.target.value);
  };

  let movies = null;
  let inputEnablerMsg = null;
  let imgUrl = "https://image.tmdb.org/t/p/w185/";
  let myPath = "";
  if (inputEntered) {
    movies = (
      <div>
        {stateMovies.map((index, movie) => {
          if (movie.poster_path) {
            myPath = movie.poster_path;
            console.log(movie);
          } else if (movie.backdrop_path) myPath = movie.backdrop_path;
          else return <p key={index}> NO IMAGE! sorry :(</p>;
          return (
            <Movie
              key={movie.id}
              title={movie.title}
              image={imgUrl + myPath}
              description={movie.overview}
              name={movie.title}
              rating={movie.vote_average}
            />
          );
        })}
      </div>
    );
  } else inputEnablerMsg = <p>Enter an input please!</p>;
  return (
    <div>
      <SearchBar onChange={handleChange} />
      {inputEnablerMsg}
      {movies}
    </div>
  );
};

export default SearchMovies;
