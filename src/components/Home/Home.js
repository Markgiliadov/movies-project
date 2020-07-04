import React, { useContext } from "react";
import PopularMovies from "../../containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "../../containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../containers/Movies/UpcomingMovies/UpcomingMovies";
import loginContext from "../../Contexts/loginContext";
import classes from "./Home.module.css";
import MovieModal from "../Movie/MovieModal/MovieModal";
import ClipLoader from "react-spinners/ClipLoader";

const Home = (props) => {
  const { state } = useContext(loginContext);

  let modalMovie = null;
  let allMovies = (
    <>
      <h1
        className={classes.h1}
        onClick={() => {}}
        style={{ textAlign: "center" }}
      >
        Upcoming Movies
      </h1>
      <UpcomingMovies />
      <h1 onClick={() => {}} style={{ textAlign: "center" }}>
        Popular Movies
      </h1>
      <PopularMovies />
      <h1 onClick={() => {}} style={{ textAlign: "center" }}>
        Now Playing Movies
      </h1>
      <NowPlayingMovies />;
    </>
  );

  if (state.payload.showModal) {
    modalMovie = <MovieModal />;
  } else {
    modalMovie = null;
  }
  return (
    <div>
      {allMovies}
      {modalMovie}
      <ClipLoader
        css={{
          marginLeft: "40%",
        }}
        size={150}
        color={"#123abc"}
        loading={state.loading}
      />
    </div>
  );
};

export default Home;
