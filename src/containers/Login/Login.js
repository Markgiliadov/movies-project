import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import Button from "../../components/Button/Button";
import fire from "../../Config/Fire";
// import Logo from "../../Assets/Logo/Logo.png";
// import Auxil from "../../hoc/Auxil/Auxil";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(props.loggedInStatus);
  const [statusOfLogin, setStatusOfLogin] = useState("Login");
  const [loggedState, setLoggedState] = useState(false);
  const [user, setUser] = useState(null);
  let loginForm = null;

  useEffect(() => {
    console.log(props);
    console.log(props.loggedInStatus);
    // onAuth();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("mail: " + username + " pass: " + password);
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log(res.user);
        setStatusOfLogin("Sign-Out");
        setLoggedState(true);
        setUser(res.user);
      })
      .catch((res) => console.log("err " + res));
  };

  if (props.loginStatus == false) {
    loginForm = (
      <form
        className={classes.Login_Form}
        //  className={classes.Login}
        onSubmit={handleSubmit}
      >
        {/* <img src={Logo} /> */}

        <label className={classes.Username}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className={classes.Password}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" value="Login" className={classes.Submit} />
      </form>
    );
  } else {
    loginForm = null;
  }

  return (
    <div className={classes.Login}>
      <h1>{props.msg}</h1>
      {loginForm}
    </div>
  );
};

export default Login;
