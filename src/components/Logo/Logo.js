import React, { useState } from "react";
import Logo from "../../Assets/Logo/Logo-2.png";
import classes from "./Logo.module.css";
import LoginSideDrawer from "../LoginSideDrawer/LoginSideDrawer";
const MyLogo = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerToggleHandler = () => {
    console.log(showSideDrawer);
    setShowSideDrawer(true);
  };
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  return (
    <div className={classes.Logo_Div}>
      <img
        className={classes.Logo}
        src={Logo}
        alt="Logo"
        onMouseEnter={sideDrawerToggleHandler}
        // onMouseLeave={sideDrawerClosedHandler}
        // onPointerLeave={sideDrawerClosedHandler}
        // onPointerEnter=
      />
      <LoginSideDrawer
        open={showSideDrawer}
        onLeave={sideDrawerClosedHandler}
      />
    </div>
  );
};

export default MyLogo;
