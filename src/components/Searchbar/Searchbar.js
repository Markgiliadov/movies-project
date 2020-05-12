import React from "react";
import classes from "./Searchbar.module.css";
const searchbar = (props) => {
  return (
    <input
      className={classes.Searchbar}
      type="text"
      onChange={props.onChange}
    />
  );
};

export default searchbar;
