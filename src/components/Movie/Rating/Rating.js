import React from "react";
// import classes from "./Rating.module.css";
const rating = (props) => {
  return (
    <div>
      <h3>Most Rated:</h3>
      {props.name}
      <h1 style={{ color: "red" }}>{props.rating}</h1>
    </div>
  );
};

export default rating;
