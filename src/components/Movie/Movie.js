import React from "react";
import classes from "./Movie.module.css";
import popularClasses from "../../containers/Movies/PopularMovies/PopularMovies.module.css";
import Rating from "./Rating/Rating";
const movie = (props) => {
  // const myClassname = props.className;
  let searchedMovie = null;
  let otherMovie = null;

  if (props.isSearched)
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
  else
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
            <div className={popularClasses.movie_content_header}>
              {/* <h3 className={popularClasses.movie_title}>{props.title}</h3> */}
              {/* <div className={popularClasses.imax_logo}></div> */}
            </div>
            {/* <div className={popularClasses.movie_info}>
              <div className={popularClasses.info_section}>
                {props.description}
              </div>
            </div> */}

            {/* <div className={classes.rating}>
            <Rating name={props.name} rating={props.rating} />
          </div> */}
          </div>
          {/* <div className={popularClasses.movie_desc}>
          <p style={{ padding: "8px" }}>{props.description}</p>
        </div> */}
        </div>
      </div>
    );

  // myClasses = props.classes;
  // const myClasses = props.classes;
  // classes = myClasses;
  return (
    <div>
      {searchedMovie}
      {otherMovie}
    </div>
  );
};

export default movie;
