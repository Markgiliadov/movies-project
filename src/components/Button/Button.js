import React from "react";
import classes from "./Button.module.css";

const mybutton = props => {
  return (
    <button className={classes.button1} onClick={props.myFunction}>
      {props.name}
    </button>
  );
};

export default mybutton;
