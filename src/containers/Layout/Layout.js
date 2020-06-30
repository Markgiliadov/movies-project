import React, { useEffect, useReducer, useContext } from "react";
import loginContext from "../../Contexts/loginContext";
import Toolbar from "../../components/Toolbar/Toolbar";
// import fire from "../../FirebaseAuth/Fire";
import Main from "../Main/Main";
//import firebaseContext from "../../Contexts/firebaseContext";
import FirebaseStore from "../../FirebaseAuth/Firebase";

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoginSpinnerStatus": {
      return {
        ...state,
        loginSpinnerStatus: action.payload,
      };
    }
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
    //loggedIn: sets user to email, password from Login
    case "loggedIn": {
      //  console.log(state, action.payload);
      return {
        ...state,
        loginStatus: true,
        user: action.payload,
        loginStateTkn: action.loginStateTkn,
      };
    }
    case "loggedOut":
      return {
        ...state,
        loginStatus: false,
        loginStateTkn: null,
        user: "",
        username: "",
        password: "",
      };
    /*case "setUsername":
      return { ...state, username: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };*/
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
  //const firebase = useContext(firebaseContext);
  const initialState = {
    loginSpinnerStatus: "",
    loginStatus: false,
    username: "",
    password: "",
    loginStateTkn: null,
    loading: true,
    payload: { showModal: false, popMovie: "" },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const signOut = () => {
    dispatch({ type: "setLoginSpinnerStatus", payload: true });
    FirebaseStore.auth()
      .signOut()
      .then((res) => {
        dispatch({ type: "setLoginSpinnerStatus", payload: false });
        console.log(state.loginStatus);
        dispatch({ type: "loggedOut" });
        localStorage.removeItem("JWT");
        localStorage.removeItem("email");
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
