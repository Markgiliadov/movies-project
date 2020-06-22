import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
// import fire from "../../FirebaseAuth/Fire";
import loginContext from "../../Contexts/loginContext";
import BarLoader from "react-spinners/BarLoader";
import firebaseContext from "../../Contexts/firebaseContext";

const Login = (props) => {
  const firebase = useContext(firebaseContext);
  const { state, dispatch } = useContext(loginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSpinnerStatus, setLoginSpinnerStatus] = useState(
    state.loginStatus
  );

  useEffect(() => {
    const data = localStorage.getItem("JWT");
    if (data) {
      dispatch({ type: "loggedIn", loginStateTkn: data });
    } else dispatch({ type: "loggedOut", loginStateTkn: null });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // loginForm = null;
    setLoginSpinnerStatus(true);

    firebase
      .doSignInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log(res.user);
        dispatch({ type: "setUsername", payload: username });
        dispatch({ type: "setPassword", payload: password });

        res.user.getIdTokenResult(true).then((tk) => {
          localStorage.setItem("JWT", tk.token);
          dispatch({
            type: "loggedIn",
            loginStateTkn: tk.token,
            payload: { username: username, password: password },
          });
          setLoginSpinnerStatus(false);
        });
      })
      .catch((res) => console.log("err " + res));
    setUsername("");
    setPassword("");
  };
  let loginForm = null;
  // console.log(state);
  if (loginSpinnerStatus || state.loginStatus) {
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

  return (
    <div className={classes.Login}>
      <h2>{state.user ? <p>{state.user.email}</p> : <p>no email</p>}</h2>
      <h1>
        {state.loginStatus ? <p>LoggedIN NOW</p> : <p>Not LoggedIn NoW</p>}
      </h1>
      {loginForm}
      <BarLoader
        // size={450}
        height={5}
        width={"100%"}
        color={"#123abc"}
        loading={loginSpinnerStatus}
      />
    </div>
  );
};

export default Login;
