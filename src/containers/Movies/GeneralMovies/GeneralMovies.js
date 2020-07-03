import React, { useState, useEffect, useContext } from "react";
import Movie from "../../../components/Movie/Movie";
import useFetch from "./useFetch";
import classes from "./GeneralMovies.module.css";
import Searchbar from "../../../components/Searchbar/Searchbar";
import noImg from "../../../Assets/NoImg/noImg1.png";
import ClipLoader from "react-spinners/ClipLoader";
import loginContext from "../../../Contexts/loginContext";

const GeneralMovies = (props) => {
  const { state, dispatch } = useContext(loginContext);
  // const [loading, setLoading] = useState(false);
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

  data = useFetch(props, searchInput, dispatch, state);
  Promise.resolve(data)
    .then((val) => {
      if (searchInput !== "" || !props.isSearched) {
        movies = [];
        console.log(val);
        setStateMovies(() => {
          setInputEntered(true);
          return val;
        });
        data = null;
      } else setInputEntered(false);
    })
    .catch((err) => console.log(err));

  const searchMovie = (event) => {
    myInput = event.target.value;
    if (myInput) {
      // setLoading(true);
      dispatch({ type: "spinnerStatus", payload: true }); //dispatch isnt a function?
    }
    setSearchInput(myInput);
  };

  if (!props.isSearched) {
    myStyle = classes.style;
  } else {
    searchBar = <Searchbar onChange={(e) => searchMovie(e)} />;
    myStyle = classes.searchedMovies;
  }

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
                {...props}
                isSearched={props.isSearched}
                key={movie.id}
                title={movie.title}
                description={movie.overview}
                image={movieImg}
                releaseDate={movie.release_date}
                movieTimeMinutes={movie.runtime}
                voteCount={movie.vote_count}
                genres={movie.genres.map((genre, index) => {
                  if (index === movie.genres.length - 1) return genre.name;
                  else return genre.name + ", ";
                })}
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
      <p style={{ textAlign: "center" }}>Please! enter a search input above!</p>
    );

  return (
    <>
      {searchBar}
      {inputEnablerMsg}
      <ClipLoader
        css={{ marginLeft: "40%" }}
        size={150}
        color={"#123abc"}
        loading={state.loading}
      />
      {movies}
    </>
  );
};

export default GeneralMovies;
