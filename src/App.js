import React, { Component } from "react";

import "./App.css";

import ReactVisExample from "./ReactVisExample";
import RechartsExample from "./RechartsExample";

// import mockData from "./data/mock.json";
import mockData from "./data/mock2.json";

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="example">
          <h1>
            <a href="https://github.com/uber/react-vis">ReactVis</a> Example
          </h1>
          <ReactVisExample weeklyScores={mockData.weekly_scores} />
        </div>
        <div className="example">
          <h1>
            <a href="https://github.com/recharts/recharts">Recharts</a> Example
          </h1>
          <RechartsExample weeklyScores={mockData.weekly_scores} />
        </div>
      </div>
    );
  }
}

export default App;
