import React, { useState, useEffect } from "react";
import ButtonClass from "../../components/Button/Button.module.css";
import fire from "../../Config/Fire";
import classes from "./Register.module.css";
const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  // useEffect(() => {
  // alert("user changed" + user.name);
  // fire.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     alert("user1 " + user.email);
  //     console.log(user);
  //   } else {
  //     alert("user2 ");
  //   }
  // });
  // }, [user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res);
        console.log(res);
      });
    props.history.push("/");
  };
  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
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

        <input type="submit" className={ButtonClass.button1} />
        {/* <Button myFunction={handleSubmit} name="Register" /> */}
      </form>
    </div>
  );
};

export default Register;

//Goal: 1.register in firebase
//2.Sign in, sign-out.
