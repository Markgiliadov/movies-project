import React, { useEffect, useReducer } from "react";
import loginContext from "../../Contexts/loginContext";
import Toolbar from "../../components/Toolbar/Toolbar";
import fire from "../../Config/Fire";
import Main from "../../containers/Main/Main";
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "loggedIn":
      return {
        loginStatus: true,
        user: fire.auth().currentUser,
        loginStateTkn: action.loginStateTkn,
      };
    case "loggedOut":
      return {
        loginStatus: false,
        loginStateTkn: null,
        user: null,
        username: "",
        password: "",
      };
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    default:
      return { loginStatus: null, user: null, loginStateTkn: null };
  }
};
const Layout = (props) => {
  const initialState = {
    loginStatus: false,
    username: "",
    password: "",
    loginStateTkn: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuth();
  }, []);

  const onAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
      } else {
        dispatch({ type: "loggedOut" });
        localStorage.removeItem("JWT");
      }
    });
  };
  const signOut = () => {
    fire
      .auth()
      .signOut()
      .then((res) => {
        console.log(state.loginStatus);
        dispatch({ type: "loggedOut" });
        localStorage.removeItem("JWT");
      });
  };
  return (
    <loginContext.Provider value={{ state, dispatch }}>
      <>
        <Toolbar signOut={signOut} loginStatus={state.loginStatus} />
        <Main />
      </>
    </loginContext.Provider>
  );
};

export default Layout;
