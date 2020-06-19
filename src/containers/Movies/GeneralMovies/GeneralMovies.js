import React, { useState, useEffect, useContext } from "react";
import Movie from "../../../components/Movie/Movie";
import useFetch from "./useFetch";
import classes from "./GeneralMovies.module.css";
import Searchbar from "../../../components/Searchbar/Searchbar";
import noImg from "../../../Assets/NoImg/noImg1.png";
import ClipLoader from "react-spinners/ClipLoader";
import movieInformationContext from "../../../Contexts/movieInformationContext";

const GeneralMovies = (props) => {
  const { state, dispatch } = useContext(movieInformationContext);
  // console.log(stateMovieContext);
  const [loading, setLoading] = useState(false);
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
  // console.log("input entered " + inputEntered);
  // const setLoadingState = () => {
  //   setLoading();
  // };
  data = useFetch(props, searchInput, setLoading, dispatch, state);
  // const resolvingData = () => {
  Promise.resolve(data)
    .then((val) => {
      if (searchInput !== "" || !props.isSearched) {
        movies = [];

        setStateMovies(() => val);

        data = null;
      } else setInputEntered(false);
    })
    .catch((err) => console.log(err));
  // };
  const searchMovie = (event) => {
    // resolvingData();
    myInput = event.target.value;
    if (myInput) {
      setLoading(true);
      if (state) dispatch({ type: "spinnerStatus", loading: true }); //dispatch isnt a function?
      setInputEntered(true);
    }
    setSearchInput(myInput);
  };

  // console.log(data);
  if (!props.isSearched) {
    myStyle = classes.style;
    stateMovies.splice(7, stateMovies.length - 7);
  } else searchBar = <Searchbar onChange={searchMovie} />;
  const moviesInit = () => {
    if (inputEntered || !props.isSearched) {
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
    } else
      inputEnablerMsg = (
        <p style={{ textAlign: "center" }}>
          Please! enter a search input above! :)
        </p>
      );
  };
  moviesInit();

  return (
    <>
      {searchBar}
      {inputEnablerMsg}
      {movies}
      <ClipLoader
        css={{ marginLeft: "40%" }}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
    </>
  );
};

export default GeneralMovies;
