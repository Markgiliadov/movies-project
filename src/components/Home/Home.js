import React, {
  Component,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import PopularMovies from "../../containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "../../containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../containers/Movies/UpcomingMovies/UpcomingMovies";
import movieInformationContext from "../../Contexts/movieInformationContext";
import classes from "./Home.module.css";
import MovieModal from "../Movie/MovieModal/MovieModal";
import ClipLoader from "react-spinners/ClipLoader";
import MovieInformation from "../Movie/MovieInformation/MovieInformation";

const reducer = (state, action) => {
  switch (action.type) {
    case "spinnerStatus": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "showMovieInfo": {
      console.log(action.payload.popMovie);
      return {
        showMovieInfo: true,
        loading: false,
        payload: {
          popMovie: action.payload.popMovie,
          showModal: action.payload.showModal,
        },
      };
    }
    case "closeMovieInfo": {
      return {
        loading: false,
        showMovieInfo: false,
        payload: {
          popMovie: null,
          showModal: false,
        },
      };
    }

    default:
      return { showMovieInfo: null, showModal: null, payload: null };
  }
};
const Home = (props) => {
  const initialState = {
    showMovieInfo: false,
    loading: true,
    payload: { showModal: false, popMovie: "" },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  let popMovie = null;
  let allMovies = (
    <>
      <h1
        onClick={() => {
          dispatch({ type: "closeMovieInfo" });
        }}
        style={{ textAlign: "center" }}
      >
        Upcoming Movies
      </h1>
      <UpcomingMovies />
      <h1
        onClick={() => {
          dispatch({ type: "closeMovieInfo" });
        }}
        style={{ textAlign: "center" }}
      >
        Popular Movies
      </h1>
      <PopularMovies />
      <h1
        onClick={() => {
          dispatch({ type: "closeMovieInfo" });
        }}
        style={{ textAlign: "center" }}
      >
        Now Playing Movies
      </h1>
      <NowPlayingMovies />;
    </>
  );
  if (state.showMovieInfo) {
    popMovie = <MovieModal />;
    // allMovies = null;
  }
  // useEffect(() => {
  //   allMovies = null;
  // }, [state.showMovieInfo]);
  return (
    <movieInformationContext.Provider value={{ state, dispatch }}>
      <div
        // onClickCapture={onClose}
        onClick={() => {
          console.log("checking if captured");

          // if (popMovie)
          //   if (popMovie)
          //
        }}
      >
        {allMovies}
        {state.payload.showModal ? popMovie : null}
        <ClipLoader
          css={{
            marginLeft: "40%",
          }}
          size={150}
          color={"#123abc"}
          loading={state.loading}
        />
        {/* {state.showMovieInfo
          ? // <MovieInformation payload={state.payload} />
            { popMovie }
          : null} */}
      </div>
    </movieInformationContext.Provider>
  );
};

export default Home;
