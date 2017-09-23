import React, { Component } from "react";
import DepartureBoard from "./containers/DepartureBoard";

import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="Departures">
        <div className="Departure board">
          <DepartureBoard />
        </div>
      </div>
    );
  }
}

export default App;
