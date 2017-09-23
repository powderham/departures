import React, { Component } from "react";

class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      callingPoints: []
    };
  }

  getServiceData(serviceId) {
    console.log(serviceId);
    fetch(
      `https://huxley.apphb.com/service/${serviceId}?accessToken=DA1C7740-9DA0-11E4-80E6-A920340000B1`,
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
    const { callingPoints } = this.state;
    const destination = train.destination[0].locationName;
    return (
      <div
        className="departure-container"
        onClick={() => this.getServiceData(train.serviceID)}
      >
        <div className="departure-row">
          <div className="location-container">
            <div className="destination">{destination}</div>
            <div className="platform">Platform: {train.platform}</div>
          </div>
          <div className="time-container">
            <div className="departure-time">{train.std}</div>
            <div className="departure-time">{train.etd}</div>
          </div>
        </div>
        <ul>
{        console.log(callingPoints)
}        {callingPoints &&
          callingPoints.map(station =>
            <li>{station.locationName}</li>
          )}
          </ul>
      </div>
    );
  }
}

export default Train;
