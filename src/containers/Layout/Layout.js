import React, { Component } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import Auxil from "../../hoc/Auxil/Auxil";
import fire from "../../Config/Fire";
import Main from "../../containers/Main/Main";
class Layout extends Component {
  constructor(props) {
    super(props);
    this.onAuth = this.onAuth.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      msg: "NOT_LOGGED",
      loginStatus: false,
    };
  }
  componentDidMount() {
    this.onAuth();
  }
  onAuth = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ msg: "logged in now", loginStatus: true });
        // User is signed in.
      } else {
        console.log("no user");
        this.setState({ msg: "not logged in", loginStatus: false });

        // No user is signed in.
      }
    });
  };
  signOut = () => {
    fire
      .auth()
      .signOut()
      .then((res) => {
        console.log(res);
      });
  };
  render() {
    return (
      <Auxil>
        <Toolbar loginStatus={this.state.loginStatus} signOut={this.signOut} />
        <Main loginStatus={this.state.loginStatus} msg={this.state.msg} />
      </Auxil>
    );
  }
}

export default Layout;
