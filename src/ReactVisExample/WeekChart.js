import React from "react";
import PropTypes from "prop-types";
import { XYPlot, XAxis, VerticalRectSeries } from "react-vis";
import "react-vis/dist/style.css";

import { getDayFromIndex } from "../utils";

class WeekChart extends React.Component {
  formatWeeklyTick = (v, i) => getDayFromIndex(i);

  // https://github.com/uber/react-vis/issues/67
  transformDataToRectSeries = () => {
    const { dailyScores } = this.props;
    const rawXY = this.getXY(dailyScores);
    const columnWidth = 0.5;

    const transformed = rawXY.map((el, i) => {
      const d = { ...el };
      d.x0 = i + 1 - columnWidth / 2;
      d.x = i + 1 + columnWidth / 2;
      return d;
    });
    return transformed;
  };

  getXY = dailyScores =>
    dailyScores.map((v, i) => ({
      x: i,
      y: v
    }));

  render() {
    const { dailyScores } = this.props;
    const maxScore = Math.max(...dailyScores);
    const maxYDomain = maxScore === 0 ? 50 : maxScore;

    return (
      <XYPlot
        height={90}
        width={115}
        margin={{ left: 4, right: 4, top: 0, bottom: 30 }}
        yDomain={[1, maxYDomain]}
      >
        <XAxis
          hideLine
          style={{
            line: { stroke: "none" },
            ticks: { stroke: "none" },
            text: {
              // fill: '#6b6b76',
              fontSize: "9px"
            }
          }}
          tickFormat={this.formatWeeklyTick}
        />
        <VerticalRectSeries
          animation
          data={this.transformDataToRectSeries()}
          // data={this.getXY(dailyScores)}
          style={{
            stroke: "none",
            fill: "#8884d8"
          }}
        />
      </XYPlot>
    );
  }
}

WeekChart.propTypes = {
  dailyScores: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default WeekChart;
