import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import fire from "../../Config/Fire";
import loginContext from "../../Contexts/loginContext";

const Login = (props) => {
  const { state, dispatch } = useContext(loginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let loginForm = null;

  useEffect(() => {
    const data = localStorage.getItem("JWT");
    if (data) {
      dispatch({ type: "loggedIn", loginStateTkn: data });
    } else dispatch({ type: "loggedOut", loginStateTkn: null });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("mail: " + username + " pass: " + password);
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log(res.user);
        dispatch({ type: "setUsername", payload: username });
        dispatch({ type: "setPassword", payload: password });

        res.user.getIdTokenResult(true).then((tk) => {
          localStorage.setItem("JWT", tk.token);
          dispatch({ type: "loggedIn", loginStateTkn: tk.token });
          // setStateData({ loginStateTkn: tk.token });
          // console.log(loginStateTkn);
        });
      })
      .catch((res) => console.log("err " + res));
    setUsername("");
    setPassword("");
  };
  // console.log(loginStateTkn);
  console.log(state);
  if (state.loginStateTkn) {
    // console.log("tkn != null");
    loginForm = null;
  } else {
    loginForm = (
      <form className={classes.Login_Form} onSubmit={handleSubmit}>
        <label className={classes.Username}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label className={classes.Password}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <input
          type="submit"
          value="Login"
          className={classes.Submit}
          style={{ cursor: "pointer" }}
        />
      </form>
    );
  }
  // console.log(fire.auth().currentUser);

  return (
    <div className={classes.Login}>
      <h2>{state.user ? <p>{state.user.email}</p> : <p>no email</p>}</h2>
      <h1>
        {state.loginStatus ? <p>LoggedIN NOW</p> : <p>Not LoggedIn NoW</p>}
      </h1>
      {loginForm}
    </div>
  );
};

export default Login;
