import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from 'material-ui/AppBar';

import DepartureBoard from "./containers/DepartureBoard";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <DepartureBoard />
      </MuiThemeProvider>
    );
  }
}

export default App;
