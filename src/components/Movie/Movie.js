import React, { useEffect } from "react";
import classes from "./Movie.module.css";
import popularClasses from "../../containers/Movies/PopularMovies/PopularMovies.module.css";
import Rating from "./Rating/Rating";

const Movie = (props) => {
  let searchedMovie = null;
  let otherMovie = null;
  let image = null;

  if (props.isSearched) {
    searchedMovie = (
      <div className={classes.movie_card}>
        <div className={classes.info_section}>
          <div className={classes.movie_header}>
            <h1>{props.title}</h1>
          </div>
          <div>
            <img className={classes.Images} src={props.image} alt="Movie" />
          </div>
          <div className={classes.rating}>
            <Rating name={props.name} rating={props.rating} />
          </div>
        </div>
        <div className={classes.movie_desc}>
          <p style={{ padding: "8px" }}>{props.description}</p>
        </div>
      </div>
    );
  } else
    otherMovie = (
      <div className={popularClasses.container}>
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
  return (
    <>
      {searchedMovie}
      {otherMovie}
    </>
  );
};

export default Movie;
