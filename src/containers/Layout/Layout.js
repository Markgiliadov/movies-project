import React, { Component } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import Auxil from "../../hoc/Auxil/Auxil";
import Main from "../../containers/Main/Main";
class Layout extends Component {
  render() {
    return (
      <Auxil>
        <Toolbar />
        <Main />
      </Auxil>
    );
  }
}

export default Layout;
