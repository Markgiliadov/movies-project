import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import Home from "../../components/Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "../../components/About/About";
// import Appforgag from "../../components/Movie/MovieInformation/Appforgag";
import loginContext from "../../Contexts/loginContext";
const Main = (props) => {
  const { state, dispatch } = useContext(loginContext);

  return (
    <Switch>
      <Route path="/Movies" component={Movies} />
      <Route path="/Login" render={(props) => <Login {...props} />} />
      <Route path="/About" render={() => <About />} />
      <Route path="/Register" render={(props) => <Register {...props} />} />
      <Route path="/" exact component={Home} />
      {/* <Route path="/:id" render={(props) => <Appforgag {...props} />} /> */}
      <Route path="" exact component={Home} />
      <Route
        path="*"
        render={(props) => (
          <Register {...props} isValidPath={props.match.path} />
        )}
      />
    </Switch>
  );
};

export default Main;
