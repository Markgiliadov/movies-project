import React, { useState, useEffect, useContext } from "react";
import ButtonClass from "../../components/Button/Button.module.css";
// import fire from "../../FirebaseAuth/Fire";
import loginContext from "../../Contexts/loginContext";
import firebaseContext from "../../Contexts/firebaseContext";
import classes from "./Register.module.css";
const Register = (props) => {
  const stateLoginStatus = useContext(loginContext);
  const firebase = useContext(firebaseContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phonenumber: "",
  });
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  useEffect(() => {
    console.log(firebaseContext);
    if (localStorage.getItem("JWT")) {
      props.history.push("/");
    }
    if (props.isValidPath === "*") {
      setWrongPathMsg(
        <h1>
          404, not found! <br />
          You can Register :) <br />
          Redirected from path /{props.match.path}
        </h1>
      );
      props.history.push("/Register");
    } else setWrongPathMsg("");
  }, []);
  const handleRegister = (event) => {
    event.preventDefault();
    console.log("email: " + user.email);
    firebase
      .doCreateUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        // setUser(res.user);
        console.log(res);

        // firebase.doSignInWithEmailAndPassword(res.email, res.password);
      })
      .catch((ex) => console.log(ex));
    // firebase.doSignInWithEmailAndPassword(user.email, user.password);
    props.history.push("/Login");
  };
  const handleInputChange = (e) => {
    let val = e.target.value;
    console.log("target.name " + [e.target.name], val);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      {wrongPathMsg}
      <form className={classes.form} onSubmit={handleRegister}>
        <label className={classes.label}>
          Email
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={classes.label}>
          Password
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={classes.label}>
          Name
          <input
            className={classes.input}
            name="name"
            type="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
        <label className={classes.label}>
          <p>Phonenumber</p>
          <input
            className={classes.input}
            name="phonenumber"
            type="phonenumber"
            placeholder="Phone Number"
            value={user.phonenumber}
            onChange={(e) => handleInputChange(e)}
          />
        </label>

        <input
          type="submit"
          className={ButtonClass.button1}
          style={{ cursor: "pointer" }}
        />
      </form>
    </>
  );
};

export default Register;

//Goal: 1.register in firebase
//2.Sign in, sign-out.
