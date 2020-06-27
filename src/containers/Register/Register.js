import React, { useState, useEffect, useContext } from "react";
import ButtonClass from "../../components/Button/Button.module.css";
// import fire from "../../FirebaseAuth/Fire";
import loginContext from "../../Contexts/loginContext";
import firebaseContext from "../../Contexts/firebaseContext";
import classes from "./Register.module.css";
const initialInputStyle = [classes.input, ""];
const initialErrorMsgStyle = [classes.inputErrorInvisible, ""];
const initialInputErrorState = {
  email: "",
  password: "",
  name: "",
  phonenumber: "",
};

const Register = (props) => {
  const state = useContext(loginContext);
  const firebase = useContext(firebaseContext);
  const [inputError, setInputError] = useState(initialInputErrorState);
  // const [errorMsgStyle, setErrorMsgStyle] = useState(initialErrorMsgStyle);
  const errorMessages = {
    // email: (
    //   <h2 className={classes.inputError}>
    //     Error, Email can not be less than 6 chars!
    //   </h2>
    // ),
    badEmail: {
      emailAt: (
        <h2 className={classes.inputError}>
          Error, Email address needs to contain '@', please add it and try
          again!
        </h2>
      ),
      emailDot: (
        <h2 className={classes.inputError}>
          Error, Email address needs to contain '.', please add it and try
          again!
        </h2>
      ),
      emailLength: (
        <h2 className={classes.inputError}>
          Error, Email address username and domain needs to be at least 2 chars,
          2 chars respectively! please add it and try again!
        </h2>
      ),
      emailAfterDotLength: (
        <h2 className={classes.inputError}>
          Error, Email address domain extension(ie: '.com') needs to be at least
          1 char, please add it and try again!
        </h2>
      ),
      emailBeforeDotLength: (
        <h2 className={classes.inputError}>
          Error, Email address domain (ie: @ -this part-) needs to be at least 1
          char, please add it and try again!
        </h2>
      ),
    },
    password: (
      <p className={classes.inputError}>
        Error, Password can not be less than 6 chars/numbers!
      </p>
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
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phonenumber: "",
  });
  const [inputsStyles, setInputsStyles] = useState({
    email: initialInputStyle,
    password: initialInputStyle,
    name: initialInputStyle,
    phonenumber: initialInputStyle,
  });
  const [valStatus, setValStatus] = useState(false);
  const initialValidationStatus = Object.keys(user).length;
  const [validationStatus, setValidationStatus] = useState(false);
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  let registrationForm = null;
  useEffect(() => {
    console.log("user length " + initialValidationStatus);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const isInputValidated = inputValidation();
    if (
      isInputValidated === initialValidationStatus &&
      user.email &&
      user.password &&
      user.name &&
      user.phonenumber
    )
      handleRegister(e);
    else handleBadForm(e);
  };
  const inputValidation = () => {
    let count = initialValidationStatus;
    Object.entries(inputError).map((ie) => {
      if (ie[1].toString()) count = count - 1;
    });
    return count;
  };
  const handleBadForm = (e) => {
    alert("You must fix your inputs!");
    // let val = e.target.value;
    // let vName = e.target.name;
    // validation(vName, val, e);
    // setUser({ ...user, [vName]: val });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("email: " + user.email);
    firebase.doCreateUserWithEmailAndPassword(user.email, user.password);

    // const db = firebase.firestore();
    // db.collection("Testing")
    //   .doc("inTesting")
    //   .set({ name: "just a test" })
    //   .then((res) => {
    //     console.log(res);
    firebase.doAddUser(user.email, user.password, user.name, user.phonenumber); // setUser(res.user);
    // console.log(res);

    // firebase.doSignInWithEmailAndPassword(res.email, res.password);
    // })
    // .catch((ex) => console.log(ex));
    // firebase.doSignInWithEmailAndPassword(user.email, user.password);
    props.history.push("/Login");
  };
  const handleEmailBadFormat = (valueEn) => {
    // let valStatus = false;
    let firstStr = "";
    let secondStr = "";
    let thirdStr = "";
    let tempVal = "";
    let afterAt = "";

    if (valueEn.includes("@")) {
      [firstStr, afterAt] = valueEn.split("@");
      secondStr = afterAt;
      console.log(valStatus, firstStr, afterAt);
      if (firstStr.length > 1 && secondStr.length > 2) {
        setInputs("email", false);
        console.log(valStatus, firstStr, secondStr);
        setInputs("email", false);
        if (afterAt.includes(".")) {
          [secondStr, thirdStr] = afterAt.split(".");
          if (secondStr.length > 0) {
            if (thirdStr.length > 0) setInputs("email", false);
            else
              setInputs(
                "email",
                true,
                errorMessages.badEmail.emailAfterDotLength
              );
          } else
            setInputs(
              "email",
              true,
              errorMessages.badEmail.emailBeforeDotLength
            );
        } else setInputs("email", true, errorMessages.badEmail.emailDot);
      } else setInputs("email", true, errorMessages.badEmail.emailLength);
    } else setInputs("email", true, errorMessages.badEmail.emailAt);
  };
  const handlePasswordBadFormat = (valueEn) => {
    if (valueEn.length < 6) setInputs("password", true, errorMessages.password);
    else setInputs("password", false);
  };
  const handleNameBadFormat = (valueEn) => {
    if (valueEn.length < 3 || valueEn.length > 24)
      setInputs("name", true, errorMessages.name);
    else setInputs("name", false);
  };
  const handlePhonenumberBadFormat = (valueEn) => {
    if (valueEn.length < 10)
      setInputs("phonenumber", true, errorMessages.phonenumber);
    else setInputs("phonenumber", false);
  };
  const setInputs = (keyInput, dangerStyle, errorProp) => {
    if (dangerStyle) {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChange],
      });
      setInputError({
        ...inputError,
        [keyInput]: errorProp,
      });
    } else {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: initialInputStyle,
      });
      setInputError({
        ...inputError,
        [keyInput]: "",
      });
    }
  };
  const validation = (inputName, valueEn, e) => {
    if (valueEn.length > 0)
      switch (inputName) {
        case "email":
          {
            handleEmailBadFormat(valueEn);
          }
          break;
        case "password":
          {
            handlePasswordBadFormat(valueEn);
            // setErrorMsgStyle([classes.inputError]);
          }
          break;
        case "name":
          {
            handleNameBadFormat(valueEn);
          }
          break;
        case "phonenumber":
          {
            handlePhonenumberBadFormat(valueEn);
          }
          break;
        default: {
          setInputsStyles(initialInputStyle);
          setInputError(initialInputErrorState);
        }
      }
    else {
      setInputsStyles({ ...inputsStyles, [inputName]: initialInputStyle });
      setInputError({ ...inputError, [inputName]: "" });
    }
  };
  const handleInputChange = (e) => {
    // console.log(inputError);
    let val = e.target.value;
    let vName = e.target.name;
    validation(vName, val, e);
    setUser({ ...user, [vName]: val });
    // console.log(user);
  };

  if (!state.loginStatus)
    registrationForm = (
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <label className={classes.label}>
          Email
          <input
            className={inputsStyles.email.join(" ")}
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => {
              handleInputChange(e);
              // console.log(inputsStyles.email);
            }}
            // onFocus={(e) => {
            //   setInputsStyles({
            //     ...inputsStyles,
            //     ["email"]: [...inputsStyles.email, classes.inputOnFocus],
            //   });
            // }}
          />
          {inputError.email}
        </label>
        <label className={classes.label}>
          Password
          <input
            className={inputsStyles.password.join(" ")}
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
            className={inputsStyles.name.join(" ")}
            name="name"
            type="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleInputChange(e)}
          />
          {inputError.name}
        </label>
        <label className={classes.label}>
          Phonenumber
          <input
            className={inputsStyles.phonenumber.join(" ")}
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
          value="Register"
          className={ButtonClass.button1}
          style={{ cursor: "pointer", height: "45px", marginTop: "5px" }}
        />
      </form>
    );
  return (
    <>
      <button
        onClick={() => {
          firebase.doGetUsers();
        }}
      >
        get usr
      </button>
      {wrongPathMsg}
      {registrationForm}
    </>
  );
};

export default Register;
// adding specific validation for email to include @, etc, same for password, numbers and letters..
// adding firestore saving users, than having an  example page, access to all movies(only registered)
// adding review tab on the right of a movie, access to star reviewing system
