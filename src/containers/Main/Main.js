import React from "react";
import { Switch, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import { Component } from "react";
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Movies" exact component={Movies} />
        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />
      </Switch>
    );
  }
}

export default Main;
