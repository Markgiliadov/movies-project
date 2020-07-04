import React, { useEffect, useState, useContext } from "react";
import classes from "./Movie.module.css";
import popularClasses from "../../containers/Movies/PopularMovies/PopularMovies.module.css";
import Rating from "./Rating/Rating";

import loginContext from "../../Contexts/loginContext";
import Button from "../Button/Button";
const Movie = (props) => {
  const { state, dispatch } = useContext(loginContext);

  let attachedClasses = [popularClasses.container, classes.Close];
  // const [myCStyle, setMyCStyle] = useState();
  const [popMovie, setPopMovie] = useState({});
  const [myTitleStyle, setMyTitleStyle] = useState([classes.movie_modal]);
  let searchedMovie = null;
  let otherMovie = null;
  let movieTitle = <p className={myTitleStyle}>{popMovie.title}</p>;

  useEffect(() => {
    setPopMovie({
      title: props.title,
      image: props.image,
      description: props.description,
    });
  }, [props.description, props.title, props.image]);
  // };
  if (props.isSearched) {
    searchedMovie = (
      <div style={{ display: "flex" }}>
        <div className={classes.movie_card} style={{ display: "flex" }}>
          <img className={classes.locandina} src={props.image} alt="Movie" />
          <div className={classes.info_section}>
            <div className={classes.movie_header}>
              <h1>{props.title}</h1>
              <h4>{props.releaseDate.split("-")[0]}</h4>
              <span className={classes.minutes}>
                {props.movieTimeMinutes} min
              </span>
              <p className={classes.type}>{props.genres}</p>
            </div>
            <div className={classes.movie_desc}>
              <p className={classes.text}>{props.description}</p>
            </div>

            {/* <img className={classes.Images} src={props.image} alt="Movie" /> */}
          </div>
          {/* <div className={classes.rating}> */}

          {/* </div> */}
          {/* <div className={classes.blur_back}> */}
          {/* <img className={classes.Images} src={props.image} alt="Movie" /> */}
          {/* </div> */}
          <Rating
            {...props}
            name={props.name}
            rating={props.rating}
            voteCount={props.voteCount}
          />
        </div>
      </div>
    );
  } else {
    // styling for other movies, not searched ones
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
    console.log("POP MOVIE" + state.payload.popMovie + "DONE");

    let showModalToggle = state.payload.showModal;
    if (state.payload.popMovie === popMovie)
      showModalToggle = !state.payload.showModal;
    else showModalToggle = true;
    console.log("BEFORE dispatching showModal" + showModalToggle);
    dispatch({
      type: "showMovieInfo",
      payload: { popMovie: popMovie, showModal: showModalToggle },
    });
  };
  return (
    <>
      {searchedMovie}
      {!props.isSearched ? (
        <Button
          name={movieTitle}
          style={{ cursor: "pointer" }}
          myFunction={handleMovieInformation}
          onHover={() => {
            const hoverStyle = [classes.movie_modal, classes.movie_modal_hover];
            setMyTitleStyle(hoverStyle.join(" "));
          }}
          leaveHover={() => {
            const hoverStyle = [
              classes.movie_modal,
              classes.movie_modal_leaveHover,
            ];
            setMyTitleStyle(hoverStyle.join(" "));
          }}
        >
          {otherMovie}
        </Button>
      ) : null}
    </>
  );
};

export default Movie;
