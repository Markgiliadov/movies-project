import React, { useState, useEffect, useContext } from "react";
import loginContext from "../../Contexts/loginContext";
import classes from "./Register.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FirebaseContext } from "../../FirebaseAuth/index";
import NotAvailableIcon from "../../Assets/NotAvailableEmailIcon/X-icon.png";
const initialInputStyle = [classes.input, ""];
// const initialErrorMsgStyle = [classes.inputErrorInvisible, ""];
const initialInputState = {
  email: "",
  password: "",
  name: "",
  phonenumber: "",
};

const Register = (props) => {
  const Firebase = useContext(FirebaseContext);
  const { state, dispatch } = useContext(loginContext);
  const [inputError, setInputError] = useState(initialInputState);

  const errorMessages = {
    badEmail: {
      emailUnavailable: (
        <h2 className={classes.inputUnavailable}>
          This Email is already taken, please try a different one and try again!
        </h2>
      ),
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
          2 chars, please add it and try again!
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
    phonenumber: {
      notNumeric: (
        <h2 className={classes.inputError}>
          Error, Phonenumber can not contain letters or symbols!
        </h2>
      ),
      badLength: (
        <h2 className={classes.inputError}>
          Error, Phonenumber can not be less than 10 numbers!
        </h2>
      ),
    },
  };
  const [user, setUser] = useState(initialInputState);
  const [inputsStyles, setInputsStyles] = useState({
    email: initialInputStyle,
    password: initialInputStyle,
    name: initialInputStyle,
    phonenumber: initialInputStyle,
  });
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [
    checkEmailAvailablityTrigger,
    setCheckEmailAvailabilityTrigger,
  ] = useState(null);
  const initialValidationStatus = Object.keys(user).length;
  const [wrongPathMsg, setWrongPathMsg] = useState("");
  const [emailAvailabilityLogo, setEmailAvailabilityLogo] = useState(null);
  let registrationForm = null;
  useEffect(() => {
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
  }, [props.history, props.isValidPath, props.match.path]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isInputValidated = inputValidation();
    if (
      isInputValidated === initialValidationStatus && // if all 4 error inputs don't contain errors
      user.email &&
      user.password &&
      user.name &&
      user.phonenumber
    ) {
      dispatch({ type: "setLoginSpinnerStatus", payload: true });
      handleRegister(e);
    } else alert("you must enter an input!");
  };
  const inputValidation = () => {
    let count = initialValidationStatus;
    Object.entries(inputError).map((ie) => {
      if (ie[1].toString()) count = count - 1;
      return count;
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    props.history.push("/Login");
    const db = Firebase.getFirestore();
    Firebase.getAuth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        signInWithFirebase(user.email, user.password);
        db.collection("users").add({
          email: user.email,
          password: user.password,
          name: user.name,
          phonenumber: user.phonenumber,
        });
      })
      .catch((err) => console.log(err));
  };
  const signInWithFirebase = (username, password) => {
    Firebase.getAuth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
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
          props.history.push("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEmailAvailabilityLogo = (emailAvailable) => {
    console.log(emailAvailable);
    if (emailAvailable) {
      console.log(user.email);
      setEmailAvailabilityLogo(
        <svg
          className={classes.checkmark}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={classes.checkmark__circle}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={classes.checkmark__check}
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      );
      setLoadingEmail(false);
    } else if (emailAvailable === false) {
      setEmailAvailabilityLogo(
        <img className={classes.xicon} src={NotAvailableIcon} alt="x-icon" />
      );
      setLoadingEmail(false);
      // setEmailAvailabilityLogo(null);
    }
  };
  const checkEmailAvailablity = async (valueEn) => {
    const db = Firebase.getFirestore();
    let emailavailable = null;
    let emailUnavailable = null;
    await db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().email === valueEn) {
            setInputs(
              "email",
              true,
              errorMessages.badEmail.emailUnavailable,
              true
            );
            emailUnavailable = true;
          } else {
            emailavailable = true;
            setLoadingEmail(() => false);
          }
        });
      });
    console.log(emailavailable, "OTHJER " + emailUnavailable);
    if (emailUnavailable) handleEmailAvailabilityLogo(false);
    else handleEmailAvailabilityLogo(true);
  };
  const handleEmailBadFormat = (valueEn) => {
    let firstStr = "";
    let secondStr = "";
    let thirdStr = "";
    // let tempVal = "";
    let afterAt = "";

    if (valueEn.includes("@")) {
      [firstStr, afterAt] = valueEn.split("@");
      secondStr = afterAt;
      if (firstStr.length > 1 && secondStr.length > 2) {
        setInputs("email", false);
        setInputs("email", false);
        if (afterAt.includes(".")) {
          [secondStr, thirdStr] = afterAt.split(".");
          if (secondStr.length > 0) {
            if (thirdStr.length > 1) {
              setInputs("email", false);
              setLoadingEmail(true);
              setCheckEmailAvailabilityTrigger(
                setTimeout(() => {
                  checkEmailAvailablity(valueEn);
                }, 1000)
              );
            } else {
              setInputs(
                "email",
                true,
                errorMessages.badEmail.emailAfterDotLength
              );
            }
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
  const handlePhonenumberBadFormat = (valueEn, e) => {
    if (isNaN(valueEn) || valueEn.match(/\./g) || /\s/.test(valueEn))
      setInputs("phonenumber", true, errorMessages.phonenumber.notNumeric);
    else if (valueEn.length < 10 && valueEn.length > 0)
      setInputs("phonenumber", true, errorMessages.phonenumber.badLength);
    else setInputs("phonenumber", false);
  };
  const setInputs = (keyInput, dangerStyle, errorProp, emailUnavailable) => {
    if (emailUnavailable) {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChangeUnavailable],
      });
      setInputError({
        ...inputError,
        [keyInput]: errorProp,
      });
    }
    if (dangerStyle) {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChangeError],
      });
      setInputError({
        ...inputError,
        [keyInput]: errorProp,
      });
    } else {
      setInputsStyles({
        ...inputsStyles,
        [keyInput]: [classes.input, classes.inputChange],
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
          handleEmailBadFormat(valueEn);

          break;
        case "password":
          handlePasswordBadFormat(valueEn);

          break;
        case "name":
          handleNameBadFormat(valueEn);

          break;
        case "phonenumber":
          handlePhonenumberBadFormat(valueEn);

          break;
        default: {
          setInputsStyles({ ...inputsStyles });
          setInputError({ ...inputError });
        }
      }
    else {
      setInputsStyles({ ...inputsStyles, [inputName]: initialInputStyle });
      setInputError({ ...inputError, [inputName]: "" });
    }
  };
  const handleInputChange = (e) => {
    let val = e.target.value;
    let vName = e.target.name;
    setUser({ ...user, [vName]: val });
    validation(vName, val, e);
  };

  if (!state.loginStatus)
    registrationForm = (
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <label className={classes.label}>
          Email
          <div
            className={inputsStyles.email.join(" ")}
            style={{ display: "flex" }}
          >
            <input
              className={inputsStyles.email.join(" ")}
              style={{ border: "none", padding: "0" }}
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setEmailAvailabilityLogo(null);
                setLoadingEmail(false);
                clearTimeout(checkEmailAvailablityTrigger);
                handleInputChange(e);
              }}
            />
            <ClipLoader
              css={{ marginLeft: "2%", marginTop: "0.5%" }}
              size={15}
              color={"#123abc"}
              loading={loadingEmail}
            />
            {loadingEmail ? null : emailAvailabilityLogo}
          </div>
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
          className={classes.submit}
          style={{ cursor: "pointer", height: "45px", marginTop: "5px" }}
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
