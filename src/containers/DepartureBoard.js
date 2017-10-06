import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";

import Train from "../components/Train";
import Header from "../components/Header";

class DepartureBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departingStation: null,
      trains: []
    };

    this.updateDepartingStation = this.updateDepartingStation.bind(this);
    this.getTrainData = this.getTrainData.bind(this);
  }

  componentDidMount() {
    this.getTrainData();
  }

  updateDepartingStation(departingStation) {
    if (departingStation) {
      this.setState(
        {
          departingStation: {
            crsCode: departingStation.value,
            stationName: departingStation.label
          }
        },
        () => this.getTrainData()
      );
    }
  }

  getTrainData() {
    if (this.state.departingStation !== null) {
      fetch(
        `https://huxley.apphb.com/departures/${this.state.departingStation
          .crsCode}?accessToken=DA1C7740-9DA0-11E4-80E6-A920340000B1`,
        {
          method: "GET",
          header: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(response => {
          this.setState({ trains: response.trainServices });
        });
    }
  }

  render() {
    const { trains, departingStation } = this.state;
    const appBarContent = this.departingStation ? <div/> :   <Header
        departingStation={departingStation}
        updateDepartingStation={this.updateDepartingStation}
        handleDepartureInput={this.handleDepartureInput}
      />
    return (
      <MuiThemeProvider
        muiTheme={getMuiTheme({
          palette: {
            primary1Color: "#ffa000",
            accent1Color: "#40c4ff",
            accent2Color: "#00b0ff",
            textColor: "#ffc107"
          }
        })}
      >
        <div className="Departures">
          <AppBar
            iconElementLeft={
              appBarContent
            }
            iconStyleLeft={{width:'100%', height:'100%', display:'flex', flexDirection: 'column', alignItems: 'center'}}
            style={{display: 'flex', flexDirection: 'row'}}
          />
          <div className="Departure board">
            <ul className="departure-list">
              {trains && trains.map(train => {
                return (
                  <li key={train.serviceID}>
                    <Train train={train} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DepartureBoard;
