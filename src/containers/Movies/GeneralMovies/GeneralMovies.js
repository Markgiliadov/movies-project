import React, { useState, useEffect } from "react";
import Movie from "../../../components/Movie/Movie";
import useFetch from "./useFetch";
import classes from "./GeneralMovies.module.css";
import Searchbar from "../../../components/Searchbar/Searchbar";
import noImg from "../../../Assets/NoImg/noImg1.png";
import { NavLink } from "react-router-dom";

const GeneralMovies = (props) => {
  const [stateMovies, setStateMovies] = useState([]);
  const [inputEntered, setInputEntered] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  let inputEnablerMsg = null;
  let movies = [];
  let imgUrl = "https://image.tmdb.org/t/p/w185/";
  let myPath = null;
  let data = null;
  let searchBar = null;
  let movieImg = null;
  let myStyle = null;
  let myInput = null;
  data = useFetch(props, searchInput);
  Promise.resolve(data)
    .then((val) => {
      if (searchInput !== "" || !props.isSearched) {
        setInputEntered(true);
        setStateMovies(() => val);
      } else setInputEntered(false);
    })
    .catch((err) => console.log(err));
  movies = [];

  const searchMovie = (event) => {
    myInput = event.target.value;
    setSearchInput(myInput);
  };

  console.log(data);

  if (!props.isSearched) {
    myStyle = classes.style;
  } else searchBar = <Searchbar onChange={searchMovie} />;
  const moviesInit = () => {
    if (inputEntered) {
      movies = (
        <div className={myStyle}>
          {stateMovies.map((movie, index) => {
            if (movie.poster_path) {
              myPath = movie.poster_path;
              movieImg = imgUrl + myPath;
            } else if (movie.backdrop_path) {
              myPath = movie.backdrop_path;
              movieImg = imgUrl + myPath;
            } else movieImg = noImg;
            return (
              <div key={movie.id}>
                <Movie
                  isSearched={props.isSearched}
                  key={movie.id}
                  title={movie.title}
                  image={movieImg}
                  description={movie.overview}
                  name={movie.title}
                  rating={movie.vote_average}
                />
              </div>
            );
          })}
        </div>
      );
    } else inputEnablerMsg = <p>Please! enter a search input above! :)</p>;
  };
  moviesInit();
  const changeTheInput = () => {
    setSearchInput("a");
  };
  return (
    <>
      {searchBar}
      {inputEnablerMsg}
      {movies}
    </>
  );
};

export default GeneralMovies;
