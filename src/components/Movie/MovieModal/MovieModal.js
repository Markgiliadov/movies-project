import React, { useContext, useState, useEffect } from "react";
import classes from "./MovieModal.module.css";
import movieInformationContext from "../../../Contexts/movieInformationContext";
import Button from "../../Button/Button";
const MovieModal = (props) => {
  const { state, dispatch } = useContext(movieInformationContext);
  //   const [clickedIn, setClickedIn] = useState(false);

  const onClose = () => {
    dispatch({ type: "closeMovieInfo" });
  };
  console.log(state);
  return (
    <div className={classes.container}>
      <Button
        name={"CLOSE"}
        myFunction={onClose}
        style={{ cursor: "pointer", borderRadius: "5px" }}
      />
      <h2 className={classes.h2}>{state.payload.popMovie.title}</h2>
      <div style={{ display: "flex" }}>
        <img
          className={classes.images}
          src={state.payload.popMovie.image}
          alt="Movie"
        />
        <p className={classes.content}>{state.payload.popMovie.description}</p>
      </div>
    </div>
  );
};

export default MovieModal;
