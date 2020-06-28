import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import Firebase, { FirebaseContext } from "./FirebaseAuth/index";
const app = (
  <BrowserRouter>
    {/* <FirebaseContext.Provider value={new Firebase()}> */}
    <App />
    {/* </FirebaseContext.Provider> */}
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById("root"));
// making sure firebase is only instantiated once

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
