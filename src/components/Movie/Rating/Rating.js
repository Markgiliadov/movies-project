import React, { useContext, useState } from "react";
import classes from "./Rating.module.css";
import loginContext from "../../../Contexts/loginContext";
import Button from "../../Button/Button";
import RatingModal from "./RatingModal/RatingModal";
const Rating = (props) => {
  const { state, dispatch } = useContext(loginContext);
  const [ratingComment, setRatingComment] = useState("");
  const [ratingModal, setRatingModal] = useState(false);
  let modal = null;
  // const [oneStar, setOneStar] = useState(
  //   <span className={classes.filled_star}>☆</span>
  // );
  let ratingStars = (
    <div className={classes.rate}>
      <link rel="stylesheet" type="text/css" href="style.css" />

      <input type="radio" id="star1" className={classes.rate} value="1" />

      <input type="radio" id="star2" name="rate" value="2" />
      <input type="radio" id="star3" name="rate" value="3" />
      <input type="radio" id="star4" name="rate" value="4" />
      <input type="radio" id="star5" name="rate" value="5" />
    </div>
  );
  // const handleClickStar = () => {
  //   ratingStars = (
  //     <div className={classes.rating}>
  //       <span className={classes.filled_star}>☆</span>
  //       <span>☆</span>
  //       <span>☆</span>
  //       <span>☆</span>
  //       <span>☆</span>
  //     </div>
  //   );
  // };
  if (ratingModal) modal = <RatingModal />;
  const handleAddRatingScore = () => {
    const toggleModal = !ratingModal;
    setRatingModal(() => toggleModal);
  };
  const handleSignUp = () => {
    props.history.push("/Register");
  };
  return (
    <div className={classes.movie_rating_card}>
      {modal}
      <h5
        style={{
          backgroundColor: "grey",
          marginRight: "auto",
          fontSize: "20px",
          textAlign: "center",
          padding: "3px",
          fontWeight: "600",
          // width: "100%",
          // marginRight: "10px",
          // padding: "3px",
          color: "rgb(247, 240, 240)",
          // borderRadius: "10px",
          // width: "inherit",
          // backgroundColor: "grey",
          // textAlign: "center",
        }}
      >
        Rating
      </h5>

      <div className={classes.content_container}>
        <div style={{ display: "flex" }}>
          <h4 className={classes.style}>{props.rating}</h4>

          <p
            style={{
              margin: "10px",
              paddingTop: "7px",
              color: "red",
              textAlign: "center",
            }}
          >
            {props.voteCount} rated this!
          </p>
          {/* {oneStar} */}
          {ratingStars}
        </div>

        {state.loginStatus ? (
          <>
            <p style={{ paddingTop: "15px" }}>
              Add in your own rating right here!
            </p>
            <Button
              className={classes.signUpButton}
              name="Add rating!"
              // myFunction={handleAddRatingScore}
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
    </div>
  );
};

export default Rating;
