import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
// import { useState } from "react";
import Logo from "../Logo/Logo";
import Aux from "../../hoc/Auxil/Auxil";
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
      {!props.loginStatus ? (
        <Aux>
          <NavLink className={classes.button1} to={{ pathname: "/Login" }}>
            Sign in
          </NavLink>
          <NavLink className={classes.button1} to={{ pathname: "/Register" }}>
            Register
          </NavLink>
        </Aux>
      ) : (
        <button
          className={classes.button1}
          style={{ cursor: "pointer" }}
          onClick={props.signOut}
        >
          Sign Out
        </button>
      )}

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
