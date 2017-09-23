import React, { Component } from "react";

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      callingPoints: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.getServiceData = this.getServiceData.bind(this);
  }

  handleClick() {
    if (this.state.expanded === false) {
      this.getServiceData();
    }
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getServiceData() {
    fetch(
      `https://huxley.apphb.com/service/${this.props.train
        .serviceID}?accessToken=DA1C7740-9DA0-11E4-80E6-A920340000B1`,
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
        this.setState({
          callingPoints: response.subsequentCallingPoints[0].callingPoint
        });
      });
  }

  render() {
    const { train } = this.props;
    const { callingPoints, expanded } = this.state;
    const destination = train.destination[0].locationName;
    return (
      <div className="departure-container" onClick={() => this.handleClick()}>
        <div className="departure-row">
          <div className="location-container">
            <div className="destination">{destination}</div>
            <div className="platform">Platform: {train.platform}</div>
          </div>
          <div className="time-container">
            <div className="scheduled-time">{train.std}</div>
            <div className="expected-time">{train.etd}</div>
          </div>
          </div>
          <ul className="calling-points">
          {expanded &&
            callingPoints &&
            callingPoints.map(station => (
              <li key={station.locationName}>
              <div className="calling-point">{station.locationName}</div>
              </li>
            ))}
            </ul>
      </div>
    );
  }
}

export default Train;
