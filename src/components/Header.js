import React, { Component } from "react";
import SuperSelectField from "material-ui-superselectfield";
import escapeRegExp from "escape-string-regexp";

import { crs } from "../helpers/stations";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = selection => {
    this.props.updateDepartingStation(selection);
  };

  handleNewRequest = () => {
    this.props.updateDepartingStation("");
  };

  render() {
    const { departingStation } = this.props;
    const configuredTrains = crs.map(station => {
      return (
        <div
          key={station.crsCode}
          value={station.crsCode}
          label={station.stationName}
        >
          {station.stationName}
        </div>
      );
    });
    const configuredStation = departingStation
      ? {
          value: departingStation.crsCode,
          label: departingStation.stationName
        }
      : null;

    return (
      <div style={{ width: "50%", height: "100%"}}>
        <SuperSelectField
          name="station-select"
          hintText="Select station"
          value={configuredStation}
          onChange={this.handleChange}
          style={{ width: "100%", height: "100%", outline: "none", color: 'white' }}

        >
          {configuredTrains}
        </SuperSelectField>
      </div>
    );
  }
}

export default Header;
