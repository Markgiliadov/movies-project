import React, { useContext } from "react";
import PopularMovies from "../../containers/Movies/PopularMovies/PopularMovies";
import NowPlayingMovies from "../../containers/Movies/NowPlayingMovies/NowPlayingMovies";
import UpcomingMovies from "../../containers/Movies/UpcomingMovies/UpcomingMovies";
import loginContext from "../../Contexts/loginContext";
import classes from "./Home.module.css";
import MovieModal from "../Movie/MovieModal/MovieModal";
import ClipLoader from "react-spinners/ClipLoader";

const Home = (props) => {
  const { state, dispatch } = useContext(loginContext);

  let popMovie = null;
  let allMovies = (
    <>
      <h1 onClick={() => {}} style={{ textAlign: "center" }}>
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
    popMovie = <MovieModal />;
  } else {
    popMovie = null;
  }
  return (
    <div>
      {allMovies}
      {popMovie}
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
