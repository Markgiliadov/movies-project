import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
// import { useState } from "react";
import Logo from "../Logo/Logo";
// import loginContext from "../../Contexts/loginContext";
// import LoginSideDrawer from "../LoginSideDrawer/LoginSideDrawer";
const Toolbar = (props) => {
  // const { state, dispatch } = useContext(loginContext);
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
            paddingBottom: "1.05em",
            marginRight: "0.7em",
            // fontWeight: "400",
            fontSize: "14px",
          }}
          myFunction={props.signOut}
          name="Sign Out"
        />
      )}
      {/* 
      <NavLink className={classes.button1} to={{ pathname: "/About" }}>
        About
      </NavLink> */}
    </div>
  );
};

export default Toolbar;
