import React from "react";
const rating = (props) => {
  return (
    <>
      <h3>Most Rated:</h3>
      {props.name}
      <h1 style={{ color: "red" }}>{props.rating}</h1>
    </>
  );
};

export default rating;
