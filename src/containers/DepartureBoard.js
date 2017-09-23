import React, { Component } from "react";
import Train from "../components/Train";
import Header from "../components/Header"

class DepartureBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: []
    };
  }

  componentDidMount() {
    this.getTrainData();
  }

  getTrainData() {
    fetch(
      "https://huxley.apphb.com/departures/hpd?accessToken=DA1C7740-9DA0-11E4-80E6-A920340000B1",
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
        console.log(response);
        this.setState({ trains: response.trainServices });
      });
  }

  render() {
    const { trains } = this.state;
    return (
      <div>
        <Header departureStation={'Harpenden'}/>
        <ul className="departure-list">
          {trains.map(train => {
            console.log(train);
            return (
              <li key={train.serviceID}>
                <Train train={train} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DepartureBoard;
