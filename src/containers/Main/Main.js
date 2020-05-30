import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "../Movies/Movies";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Component } from "react";
import fire from "../../Config/Fire";
class Main extends Component {
  // componentDidMount() {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       alert("username(mail) " + user.email + "password " + user.uid);
  //     } else {
  //       console.log(" no user signed");
  //     }
  //   });
  // }
  render() {
    return (
      <Switch>
        <Route path="/Movies" component={Movies} />
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <Route path="/" exact component={Home} />
        <Redirect
          to={{
            pathname: "*",
            state: { path: "*" },
          }}
        />
      </Switch>
    );
  }
}

export default Main;
