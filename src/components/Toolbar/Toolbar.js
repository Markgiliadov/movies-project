import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import Logo from "../Logo/Logo";
// import LoginSideDrawer from "../LoginSideDrawer/LoginSideDrawer";
const Toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <Logo />

      <NavLink
        className={classes.button1}
        // exact
        // activeStyle={{ backgroundColor: "red" }}
        to={{ pathname: "/" }}
      >
        Home
      </NavLink>
      <NavLink
        className={classes.button1}
        // exact
        // activeStyle={{ backgroundColor: "red" }}
        to={{ pathname: "/Movies" }}
      >
        All Movies
      </NavLink>
      <NavLink className={classes.button1} to={{ pathname: "/Login" }}>
        Sign in
      </NavLink>
      <NavLink className={classes.button1} to={{ pathname: "/Register" }}>
        Register
      </NavLink>
      <NavLink className={classes.button1} to={{ pathname: "/About" }}>
        About
      </NavLink>

      {/* <LoginSideDrawer onLeave={}
       open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      /> */}
    </div>
  );
};

export default Toolbar;
