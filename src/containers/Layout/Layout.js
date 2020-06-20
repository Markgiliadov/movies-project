import React, { useEffect, useReducer } from "react";
import loginContext from "../../Contexts/loginContext";
import Toolbar from "../../components/Toolbar/Toolbar";
import fire from "../../Config/Fire";
import Main from "../Main/Main";

const reducer = (state, action) => {
  switch (action.type) {
    case "spinnerStatus": {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case "showMovieInfo": {
      console.log(action.payload.popMovie);
      return {
        ...state,
        loading: false,
        payload: {
          popMovie: action.payload.popMovie,
          showModal: action.payload.showModal,
        },
      };
    }
    case "closeMovieInfo": {
      return {
        ...state,
        loading: false,
        payload: {
          popMovie: null,
          showModal: false,
        },
      };
    }
    case "loggedIn":
      return {
        ...state,
        loginStatus: true,
        user: fire.auth().currentUser,
        loginStateTkn: action.loginStateTkn,
      };
    case "loggedOut":
      return {
        ...state,
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
      return {
        loginStatus: null,
        user: null,
        loginStateTkn: null,
        showModal: null,
        payload: {
          popMovie: null,
          showModal: false,
        },
      };
  }
};
const Layout = (props) => {
  const initialState = {
    loginStatus: false,
    username: "",
    password: "",
    loginStateTkn: null,
    loading: true,
    payload: { showModal: false, popMovie: "" },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
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
      <div
        onClick={(e) => {
          if (state.payload.showModal) {
            if (!e.target.className.includes("Movie"))
              dispatch({ type: "closeMovieInfo" });
          }
        }}
      >
        <Toolbar signOut={signOut} loginStatus={state.loginStatus} />
        <Main />
      </div>
    </loginContext.Provider>
  );
};

export default Layout;
