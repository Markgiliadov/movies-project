import React from "react";
import classes from "./Button.module.css";

const mybutton = (props) => {
  let className = null;
  if (props.className) className = props.className;
  else className = classes.button1;
  return (
    <button
      className={className}
      onClick={props.myFunction}
      style={props.style}
      onPointerEnter={props.onHover}
      onPointerLeave={props.leaveHover}
      // onTouchMoveCapture={props.onHover}
      // onTouchStart={props.onHover}
    >
      {props.name}
      {props.children}
    </button>
  );
};

export default mybutton;
