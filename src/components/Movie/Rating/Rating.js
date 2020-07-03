import React, { useContext, useState } from "react";
import classes from "./Rating.module.css";
import loginContext from "../../../Contexts/loginContext";
import Button from "../../Button/Button";
const Rating = (props) => {
  const { state, dispatch } = useContext(loginContext);
  const [ratingComment, setRatingComment] = useState("");
  let ratingModal = null;
  const handleAddRatingScore = () => {
    ratingModal = <ratingModal />;
  };
  const handleSignUp = () => {
    props.history.push("/Register");
  };
  return (
    <div className={classes.rating}>
      <h1
        style={{
          padding: "3px",
          color: "rgb(247, 240, 240)",
          borderRadius: "10px",
          backgroundColor: "grey",
          textAlign: "center",
        }}
      >
        Rating
      </h1>

      <p style={{ paddingTop: "7px", color: "red" }}>
        {props.voteCount} rated this!
      </p>

      <h4 className={classes.style}>{props.rating}</h4>
      {state.loginStatus ? (
        <>
          <p style={{ paddingTop: "15px" }}>
            Add in your own rating right here!
          </p>
          {ratingModal}
          <Button
            className={classes.signUpButton}
            name="Add rating!"
            myFunction={handleAddRatingScore}
          />
        </>
      ) : (
        <p style={{ paddingTop: "15px" }}>
          Would you like to rate this movie?
          <Button
            className={classes.signUpButton}
            name="Click here to Sign UP"
            myFunction={handleSignUp}
          />
        </p>
      )}
    </div>
  );
};
const ratingModal = () => {
  return <p>rating modal</p>;
};

export default Rating;
