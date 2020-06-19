import React, { useEffect, useState, useContext } from "react";
import classes from "./Movie.module.css";
import popularClasses from "../../containers/Movies/PopularMovies/PopularMovies.module.css";
import Rating from "./Rating/Rating";
// import MovieInformation from "./MovieInformation/MovieInformation";
import movieInformationContext from "../../Contexts/movieInformationContext";
import Button from "../Button/Button";
const Movie = (props) => {
  const { state, dispatch } = useContext(movieInformationContext);

  // console.log(state);
  let attachedClasses = [popularClasses.container, classes.Close];
  const [myCStyle, setMyCStyle] = useState();
  const [otherMovieState, setOtherMovieState] = useState(true);
  const [popMovie, setPopMovie] = useState({});
  const [myTitleStyle, setMyTitleStyle] = useState({
    cursor: "pointer",
    backgroundColor: "darkgrey",
    borderRadius: "5px",
  });
  let searchedMovie = null;
  let otherMovie = null;
  let movieInformation = null;
  let image = null;
  let movieTitle = (
    <p className={classes.movieTitle} style={myTitleStyle}>
      {popMovie.title}
    </p>
  );
  // const setPopMovieInfo = () => {
  useEffect(() => {
    // movieTitle = <p className={classes.movieTitle}>{popMovie.title}</p>;

    setPopMovie({
      title: props.title,
      image: props.image,
      description: props.description,
    });
  }, []);
  // };
  if (props.isSearched) {
    searchedMovie = (
      <div className={classes.movie_card}>
        <div className={classes.info_section}>
          <div className={classes.movie_header}>
            <h1>{props.title}</h1>
          </div>
          <>
            <img className={classes.Images} src={props.image} alt="Movie" />
          </>
          <div className={classes.rating}>
            <Rating name={props.name} rating={props.rating} />
          </div>
        </div>
        <div className={classes.movie_desc}>
          <p style={{ padding: "8px" }}>{props.description}</p>
        </div>
      </div>
    );
  } else {
    // setPopMovieInfo();
    otherMovie = (
      <div className={attachedClasses}>
        <div className={popularClasses.movie_card}>
          <div className={popularClasses.movie_header}>
            <img
              className={popularClasses.Images}
              src={props.image}
              alt="Movie"
            />
          </div>
          <div className={popularClasses.movie_content}>
            <div className={popularClasses.movie_content_header}></div>
          </div>
        </div>
      </div>
    );
  }

  const handleMovieInformation = (props) => {
    console.log(popMovie);
    // const movieInformation = {};
    // console.log("title.... " + movieInformation.title);
    console.log(state.payload.movieInformation);
    let showModalToggle = state.payload.showModal;
    if (state.payload.popMovie == popMovie)
      showModalToggle = !state.payload.showModal;
    else showModalToggle = true;
    dispatch({
      type: "showMovieInfo",
      payload: { popMovie: popMovie, showModal: showModalToggle },
    });
  };
  return (
    <>
      {movieInformation}
      {searchedMovie}
      {!props.isSearched ? (
        <Button
          name={movieTitle}
          style={{ cursor: "pointer" }}
          myFunction={handleMovieInformation}
          onHover={() => {
            setMyCStyle({
              ...myCStyle,
              color: "red",
              backgroundColor: "black",
            });
            setMyTitleStyle({
              ...myTitleStyle,
              height: "inherit",
              color: "#c0bc93",
              backgroundColor: "grey",
            });
          }}
          leaveHover={() => {
            setMyTitleStyle({
              ...myTitleStyle,
              height: "25px",
              color: "white",
              backgroundColor: "darkgrey",
            });
          }}
        >
          {otherMovie}
        </Button>
      ) : null}
    </>
  );
};

export default Movie;
