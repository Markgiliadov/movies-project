import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
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
      {!props.loginStatus ? (
        <>
          <NavLink className={classes.button1} to={{ pathname: "/Login" }}>
            Sign in
          </NavLink>
          <NavLink className={classes.button1} to={{ pathname: "/Register" }}>
            Register
          </NavLink>
        </>
      ) : (
        <Button
          className={classes.button1}
          style={{
            cursor: "pointer",
            height: "51px",
            paddingBottom: "0.8em",
            marginRight: "0.9em",
            fontWeight: "400",
          }}
          myFunction={props.signOut}
          name="Sign Out"
        />
      )}

      <NavLink className={classes.button1} to={{ pathname: "/About" }}>
        About
      </NavLink>
    </div>
  );
};

export default Toolbar;
