import React from "react";
import classes from "./LoginSideDrawer.module.css";
import Logo from "../../Assets/Logo/Logo.png";
// import Home from "../../components/Home/Home";
// import { Route } from "react-router-dom";
import Login from "../../containers/Login/Login";
const loginsidedrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    // attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <div className={attachedClasses.join(" ")} onMouseLeave={props.onLeave}>
      {/* <Route path={"/"} component={Home} /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "gray",
        }}
      >
        <img
          src={Logo}
          style={{
            height: "140px",
            width: "220px",
            borderRadius: "10%",
          }}
          alt="Logo"
        />
        <Login
          style={{ height: "80px" }}
          //  className={attachedClasses.join(" ")}
        />
      </div>
    </div>
  );
};

export default loginsidedrawer;
