import React, { useState, useEffect, useContext } from "react";
import ButtonClass from "../../components/Button/Button.module.css";
// import fire from "../../FirebaseAuth/Fire";
import loginContext from "../../Contexts/loginContext";
import firebaseContext from "../../Contexts/firebaseContext";
import classes from "./Register.module.css";

const errorMessages = {
  email: (
    <h2 className={classes.inputError}>
      Error, Email can not be less than 6 chars!
    </h2>
  ),
  password: (
    <h2 className={classes.inputError}>
      Error, Password can not be less than 6 chars/numbers!
    </h2>
  ),
  name: (
    <h2 className={classes.inputError}>
      Error, your Name can not be less than 3, or bigger than 24 chars!
    </h2>
  ),
  phonenumber: (
    <h2 className={classes.inputError}>
      Error, Phonenumber can not be less than 10 numbers!
    </h2>
  ),
};
const Register = (props) => {
  const state = useContext(loginContext);
  const firebase = useContext(firebaseContext);
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
    name: "",
    phonenumber: "",
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phonenumber: "",
  });
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  let registrationForm = null;
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
  const validation = (inputName, valueEn) => {
    let errorMsg = "";
    switch (inputName) {
      case "email":
        {
          if (valueEn.length < 6) {
            errorMsg = setInputError({
              ...inputError,
              email: errorMessages.email,
            });
          } else
            setInputError({
              email: "",
              password: "",
              name: "",
              phonenumber: "",
            });
        }
        break;
      case "password":
        {
          if (valueEn.length < 6) {
            setInputError({ ...inputError, password: errorMessages.password });
          } else
            setInputError({
              email: "",
              password: "",
              name: "",
              phonenumber: "",
            });
        }
        break;
      case "name":
        {
          if (valueEn.length < 3 || valueEn.length > 24) {
            setInputError({ ...inputError, name: errorMessages.name });
          } else
            setInputError({
              email: "",
              password: "",
              name: "",
              phonenumber: "",
            });
        }
        break;
      case "phonenumber":
        {
          if (valueEn.length < 10) {
            setInputError({
              ...inputError,
              phonenumber: errorMessages.phonenumber,
            });
          } else
            setInputError({
              email: "",
              password: "",
              name: "",
              phonenumber: "",
            });
        }
        break;
      default:
        setInputError({ email: "", password: "", name: "", phonenumber: "" });
    }
  };
  const handleInputChange = (e) => {
    console.log(inputError);
    let val = e.target.value;
    let vName = e.target.name;
    validation(vName, val);
    setUser({ ...user, [vName]: val });
    // console.log(user);
  };
  console.log();
  if (!state.loginStatus)
    registrationForm = (
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
            // onFocus={() => {

            // }}
          />
          {inputError.email}
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
          {inputError.password}
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
          {inputError.name}
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
          {inputError.phonenumber}
        </label>
        <input
          type="submit"
          className={ButtonClass.button1}
          style={{ cursor: "pointer", height: "49px" }}
        />
      </form>
    );
  return (
    <>
      {wrongPathMsg}
      {registrationForm}
    </>
  );
};

export default Register;
