import React, { useState, useEffect } from "react";
import Movie from "../../../components/Movie/Movie";
import useFetch from "./useFetch";
import classes from "./GeneralMovies.module.css";
import No_img from "../../../Assets/NoImg/no-image.png";
import Searchbar from "../../../components/Searchbar/Searchbar";
import movie from "../../../components/Movie/Movie";
const GeneralMovies = (props) => {
  const [stateMovies, setStateMovies] = useState([]);
  const [inputEntered, setInputEntered] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // useEffect(() => {
  // moviesInit();
  //}, [stateMovies]);
  let inputEnablerMsg = null;
  let movies = [];
  let imgUrl = "https://image.tmdb.org/t/p/w185/";
  let myPath = "";
  let data = null;
  let style = null;
  let searchBar = null;
  let myStyle = null;

  //const sortMovies = () => {
  //stateMovies.sort((a, b) => {
  //return a.vote_average - b.vote_average;
  //});
  // for (movie of stateMovies.entries()) {
  //   console.log(movie);
  // }
  // console.log("sorted");
  // const newsh = stateMovies.splice(0, stateMovies.length - 8);

  //setStateMovies(stateMovies);
  // moviesInit();
  //};
  const searchMovie = (event) => {
    const myInput = event.target.value;
    setSearchInput(myInput);
    // if (myInput != "")
    // else {
    //   console.log(myInput);
    // setInputEntered(() => false);
    // }
  };
  data = useFetch(props, searchInput);
  Promise.resolve(data).then((val) => {
    if (searchInput != "" || !props.isSearched) {
      setInputEntered(true);
      setStateMovies(val);
      // sortMovies(val);
    } else setInputEntered(false);
    // if (searchInput == "") {
    //   setInputEntered(false);
    //   setStateMovies([]);
    // }
  });
  if (!props.isSearched) {
    myStyle = classes.style;

    // stateMovies.splice(0, stateMovies.length - 8);
  } else searchBar = <Searchbar onChange={searchMovie} />;
  const moviesInit = () => {
    if (inputEntered) {
      movies = (
        <div
          // style={{ display: "flex", alignContent: "flex-start" }}
          className={myStyle}
          // className={classes.style}
        >
          {stateMovies.map((movie, index) => {
            if (movie.poster_path) {
              myPath = movie.poster_path;
              console.log(movie.title);
            } else if (movie.backdrop_path) myPath = movie.backdrop_path;

            return (
              <div key={movie.title}>
                <h2>{movie.title} </h2>
                <h3>{movie.vote_average}</h3>
                <Movie
                  isSearched={props.isSearched}
                  key={movie.id}
                  title={movie.title}
                  image={imgUrl + myPath}
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
  return (
    <div style={{ alignContent: "center" }}>
      {searchBar}
      {inputEnablerMsg}
      {movies}
    </div>
  );
};

export default GeneralMovies;
