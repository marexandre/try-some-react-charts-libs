import React from "react";
import PropTypes from "prop-types";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  MarkSeries,
  AreaSeries,
  LineSeries,
  Crosshair,
  makeWidthFlexible
} from "react-vis";
import "react-vis/dist/style.css";

import { getFillColor, getStrokeColor, getDate } from "../utils";

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class WeeklyGraph extends React.Component {
  constructor(props) {
    super(props);

    const { weeklyScores } = props;
    const defaultIndex = weeklyScores.length - 1;

    const areaData = weeklyScores.map(d => ({
      x: getDate(d),
      y: d.buckets[0],
      y0: d.buckets[2]
    }));

    const markData = weeklyScores.map(d => ({
      x: getDate(d),
      y: d.cumulative_score
    }));

    const startDate = getDate(weeklyScores[0]);
    const endDate = getDate(weeklyScores[weeklyScores.length - 1]);

    this.state = {
      areaData,
      markData,
      startDate,
      endDate,
      crosshairValues: [markData[defaultIndex]],
      hoveredNode: [markData[defaultIndex]],
      activeIndex: defaultIndex
    };

    this.tickTextStyle = {
      // fill: '#6b6b76',
      fontSize: "9px"
    };
  }

  onMouseLeave = () =>
    this.setState({ crosshairValues: [], hoveredNode: null });

  onNearestX = (value, { index }) => {
    const { weeklyScores } = this.props;
    const { markData, activeIndex } = this.state;

    if (index === activeIndex) {
      return;
    }

    this.setState({
      activeIndex: index,
      crosshairValues: [markData[index]],
      hoveredNode: [markData[index]]
    });

    this.props.snapToPoint(index, weeklyScores[index]);
  };

  render() {
    const { weeklyScores } = this.props;
    const {
      startDate,
      endDate,
      areaData,
      markData,
      crosshairValues,
      hoveredNode,
      activeIndex
    } = this.state;

    const activeDotFillColor = getFillColor(
      weeklyScores[activeIndex].cumulative_score,
      weeklyScores[activeIndex].buckets
    );
    const activeDotStrokeColor = getStrokeColor(
      weeklyScores[activeIndex].cumulative_score,
      weeklyScores[activeIndex].buckets
    );

    return (
      <FlexibleXYPlot
        xType="time"
        xDomain={[startDate, endDate]}
        // yDomain={[yRange.min, yRange.max]}
        // yDomain={[0, 400]}
        height={160}
        // width={750}
        onMouseLeave={this.onMouseLeave}
        margin={{ left: 10, right: 40, top: 16, bottom: 30 }}
      >
        <VerticalGridLines
          tickTotal={weeklyScores.lenght}
          style={{ stroke: "#efefef" }}
        />
        <XAxis
          hideLine
          style={{
            text: this.tickTextStyle
          }}
        />
        <YAxis
          orientation="right"
          hideLine
          // tickValues={[100, 200, 300, 400, 500, 600, 700, 800]}
          tickTotal={3}
          style={{
            text: this.tickTextStyle
          }}
        />
        <AreaSeries color="#efefef" data={areaData} />
        <LineSeries
          color="#ccc"
          data={markData}
          stroke="#ddd"
          strokeWidth={1}
        />
        <MarkSeries
          color="#f00"
          size={3}
          stroke="#333"
          strokeWidth={1.4}
          fill="#fff"
          data={markData}
          onNearestX={this.onNearestX}
        />
        <MarkSeries
          data={hoveredNode}
          color="#f00"
          size={5}
          fill={activeDotFillColor}
          stroke={activeDotStrokeColor}
          strokeWidth={10}
        />
        <Crosshair
          values={crosshairValues}
          style={{ line: { background: activeDotFillColor } }}
        >
          <div />
        </Crosshair>
      </FlexibleXYPlot>
    );
  }
}

WeeklyGraph.propTypes = {
  weeklyScores: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  snapToPoint: PropTypes.func.isRequired
};

export default WeeklyGraph;
