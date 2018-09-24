import React from "react";
import PropTypes from "prop-types";
import { XAxis, BarChart, Bar } from "recharts";

import { getDayFromIndex } from "../utils";

class WeekChart extends React.Component {
  render() {
    const { dailyScores } = this.props;

    const tickTextStyle = {
      fill: "#6b6b76",
      fontSize: "9px"
    };

    const barData = dailyScores.map((v, i) => ({
      x: v,
      w: getDayFromIndex(i)
    }));

    return (
      <BarChart data={barData} height={90} width={140}>
        <XAxis dataKey="w" tick={tickTextStyle} stroke="none" />
        <Bar dataKey="x" fill="#8884d8" barSize={8} minPointSize={1} />
      </BarChart>
    );
  }
}

WeekChart.propTypes = {
  dailyScores: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default WeekChart;
