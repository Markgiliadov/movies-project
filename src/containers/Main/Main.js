import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "../Movies/Movies";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "../../components/About/About";
import { Component } from "react";
import fire from "../../Config/Fire";
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Movies" component={Movies} />
        <Route
          path="/Login"
          render={(props) => <Login {...props} {...this.props} />}
        />
        <Route path="/About" render={() => <About />} />
        <Route path="/Register" render={(props) => <Register {...props} />} />

        <Route path="/" exact component={Home} />
        <Route
          path="*"
          render={(props) => (
            <Register {...props} isValidPath={props.match.path} />
          )}
        />
      </Switch>
    );
  }
}

export default Main;
