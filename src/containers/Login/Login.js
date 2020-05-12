import React, { useState } from "react";
import classes from "./Login.module.css";
// import Logo from "../../Assets/Logo/Logo.png";
// import Auxil from "../../hoc/Auxil/Auxil";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    // this.setState({ username: event.target.value });
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    // this.setState({ password: event.target.value });
  };

  const handleSubmit = (event) => {
    alert("Username: " + username + " Password: " + password);
    event.preventDefault();
  };
  return (
    <div className={classes.Login}>
      <form
        className={classes.Login_Form}
        //  className={classes.Login}
        onSubmit={handleSubmit}
      >
        {/* <img src={Logo} /> */}

        <label className={classes.Username}>
          Username:
          <input type="text" value={username} onChange={handleChangeUsername} />
        </label>
        <label className={classes.Password}>
          Password:
          <input type="text" value={password} onChange={handleChangePassword} />
        </label>
        <input type="submit" value="Login" className={classes.Submit} />
      </form>
    </div>
  );
};

export default Login;
