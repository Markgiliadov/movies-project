import React, { useState, useEffect } from "react";
import ButtonClass from "../../components/Button/Button.module.css";
import fire from "../../Config/Fire";
import classes from "./Register.module.css";
const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  useEffect(() => {
    console.log(props.isValidPath);
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
  const handleLogin = (event) => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res);
        console.log(res);
      });
    props.history.push("/Login");
  };
  return (
    <div>
      {wrongPathMsg}
      <form className={classes.form} onSubmit={handleLogin}>
        <label className={classes.label}>
          Username
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={classes.label}>
          Email
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={classes.label}>
          Password
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input
          type="submit"
          className={ButtonClass.button1}
          style={{ cursor: "pointer" }}
        />
        {/* <Button myFunction={handleSubmit} name="Register" /> */}
      </form>
    </div>
  );
};

export default Register;

//Goal: 1.register in firebase
//2.Sign in, sign-out.
