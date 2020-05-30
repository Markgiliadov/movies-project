import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import Button from "../../components/Button/Button";
import fire from "../../Config/Fire";
// import Logo from "../../Assets/Logo/Logo.png";
// import Auxil from "../../hoc/Auxil/Auxil";
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(props.location);
    // if (props.path === "*") return <div>404 not foud</div>;
  }, []);
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    // this.setState({ username: event.target.value });
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    // this.setState({ password: event.target.value });
  };
  const handleSignout = () => {
    console.log("mail: " + username + " pass: " + password);

    fire
      .auth()
      .signOut()
      .then((res) => console.log(res));
  };
  const handleSubmit = (event) => {
    // alert("Username: " + username + " Password: " + password);
    event.preventDefault();
    console.log("mail: " + username + " pass: " + password);
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => console.log(res.user))
      .catch((res) => console.log("err " + res));
  };
  const onAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        // User is signed in.
      } else {
        console.log("no user");
        // No user is signed in.
      }
    });
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
          <input
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <input type="submit" value="Login" className={classes.Submit} />
        <Button myFunction={handleSignout} name="Sign Out" />
      </form>
    </div>
  );
};

export default Login;
