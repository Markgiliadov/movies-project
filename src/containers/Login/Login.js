import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import loginContext from "../../Contexts/loginContext";
import BarLoader from "react-spinners/BarLoader";
import ClipLoader from "react-spinners/ClipLoader";
import NotAvailableIcon from "../../Assets/NotAvailableEmailIcon/X-icon.png";

// import loginsidedrawer from "../../components/LoginSideDrawer/LoginSideDrawer";
import { FirebaseContext } from "../../FirebaseAuth/index";

const Login = (props) => {
  const { state, dispatch } = useContext(loginContext);
  const Firebase = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgInvalid, setErrorMsgInvalid] = useState(null);
  const [emailAvailabilityLogo, setEmailAvailabilityLogo] = useState(null);
  const [loadingValidation, setLoadingValidation] = useState(false);
  let loginForm = null;

  useEffect(() => {
    const data = localStorage.getItem("JWT");

    if (data) {
      dispatch({ type: "setLoginSpinnerStatus", payload: false });
      dispatch({ type: "loggedIn", loginStateTkn: data });
      setUsername(localStorage.getItem("email"));
    } else dispatch({ type: "loggedOut", loginStateTkn: null });
  }, [dispatch]);

  const validateUserWithFirestore = async (username, password) => {
    const db = Firebase.getFirestore();

    let info = null;
    info = await db.collection("users").get();
    let checkifvalid = null;
    info.forEach((doc) => {
      if (doc.data().email === username && doc.data().password === password) {
        checkifvalid = true;
        dispatch({ type: "setLoginSpinnerStatus", payload: true });
        setEmailAvailabilityLogo(null);
        setErrorMsgInvalid(null);
        signInWithFirebase(username, password);
        return true;
      } else {
        setLoadingValidation(false);
        dispatch({ type: "setLoginSpinnerStatus", payload: false });
      }
    });

    if (!checkifvalid)
      setErrorMsgInvalid(
        <h2 className={classes.inputError}>
          Error, Email address or username is not valid or does not exist.
          Please add it and try again!
        </h2>
      );
  };
  const signInWithFirebase = (username, password) => {
    console.log(" user is " + username, password);

    Firebase.getAuth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
        console.log(res.user);
        dispatch({ type: "setUsername", payload: username });
        dispatch({ type: "setPassword", payload: password });
        dispatch({
          type: "loggedIn",

          payload: { username: username, password: password },
        });
        res.user.getIdTokenResult(true).then((tk) => {
          localStorage.setItem("JWT", tk.token);
          dispatch({ type: "setJWT", payload: tk.token });
          dispatch({ type: "setLoginSpinnerStatus", payload: false });
          setPassword(() => "");
          setUsername(() => "");
          props.history.push("/");
        });
      })
      .catch((res) => {
        console.log("err " + res);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingValidation(true);

    if (
      username.length === 0 ||
      !username.includes("@") ||
      !username.includes(".") ||
      password.length < 6
    ) {
      setTimeout(() => {
        setLoadingValidation(false);
      }, 150);
      setErrorMsgInvalid(
        <h2 className={classes.inputError}>
          Error, Email address or username is not formatted correctly. Please
          add it and try again!
        </h2>
      );
      setEmailAvailabilityLogo(null);
    } else {
      setErrorMsgInvalid(null);
      setEmailAvailabilityLogo(
        <img className={classes.xicon} src={NotAvailableIcon} alt="x-icon" />
      );
      validateUserWithFirestore(username, password);
    }
  };

  if (state.loginSpinnerStatus || state.loginStatus) {
    loginForm = null;
  } else {
    loginForm = (
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          Username
          <input
            className={classes.input}
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label className={classes.label}>
          Password
          <input
            className={classes.input}
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <div style={{ display: "flex", padding: "4px" }}>
          <ClipLoader
            css={{ marginLeft: "2%", marginTop: "0.5%", padding: "10px" }}
            size={20}
            color={"#123abc"}
            loading={loadingValidation}
          />
          {loadingValidation ? null : (
            <>
              {emailAvailabilityLogo} {errorMsgInvalid}
            </>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className={classes.submit}
          style={{ cursor: "pointer" }}
        />
      </form>
    );
  }

  return (
    <div className={classes.Login}>
      <BarLoader
        height={5}
        width={"100%"}
        color={"#123abc"}
        loading={state.loginSpinnerStatus}
      />
      {state.loginSpinnerStatus ? null : loginForm}
    </div>
  );
};

export default Login;
