import React from "react";
import PropTypes from "prop-types";

import { extent as d3Extent } from "d3-array";
import { scaleTime as d3ScaleTime } from "d3-scale";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  Area
} from "recharts";

import { getFillColor, getStrokeColor, getDate } from "../utils";

class WeeklyGraph extends React.Component {
  constructor(props) {
    super(props);

    const { weeklyScores } = props;
    const defaultIndex = weeklyScores.length - 1;

    const rangeData = weeklyScores.map(d => ({
      week: d.week,
      date: getDate(d).getTime(),
      score: d.cumulative_score,
      range: [d.buckets[0], d.buckets[2]]
    }));

    const domain = d3Extent(rangeData, d => getDate(d));
    const tScale = d3ScaleTime()
      .domain(domain)
      .range([0, 1]);

    this.tickFormat = tScale.tickFormat();

    this.state = {
      rangeData,
      activeIndex: defaultIndex
    };
  }

  onMouseMove = d => {
    if (!d.isTooltipActive) {
      return;
    }

    if (d.activeTooltipIndex === this.state.activeIndex) {
      return;
    }

    this.setState({ activeIndex: d.activeTooltipIndex });

    this.props.snapToPoint(
      d.activeTooltipIndex,
      this.props.weeklyScores[d.activeTooltipIndex]
    );
  };

  render() {
    const { weeklyScores } = this.props;
    const { rangeData, activeIndex } = this.state;

    const tickColor = "#efefef";
    const tickTextStyle = {
      fill: "#6b6b76",
      fontSize: "9px"
    };

    const activeDotFillColor = getFillColor(
      weeklyScores[activeIndex].cumulative_score,
      weeklyScores[activeIndex].buckets
    );
    const activeDotStrokeColor = getStrokeColor(
      weeklyScores[activeIndex].cumulative_score,
      weeklyScores[activeIndex].buckets
    );

    return (
      <ResponsiveContainer width="100%" height={160}>
        <ComposedChart
          data={rangeData}
          // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          margin={{ top: 10, right: -20, left: 20 }}
          onMouseMove={this.onMouseMove}
        >
          <CartesianGrid horizontal={false} stroke={tickColor} />
          <XAxis
            // dataKey="week"
            dataKey="date"
            scale="point"
            tick={tickTextStyle}
            tickLine={{ stroke: tickColor }}
            stroke="none"
            tickFormatter={this.tickFormat}
            minTickGap={0}
          />
          <YAxis
            orientation="right"
            tick={tickTextStyle}
            tickLine={{ stroke: tickColor }}
            stroke="none"
          />
          <Area
            isAnimationActive={false}
            // type="monotone"
            dataKey="range"
            stroke="#efefef"
            fill="#efefef"
            fillOpacity={1}
            activeDot={null}
          />
          <Line
            isAnimationActive={false}
            // type="monotone"
            dataKey="score"
            stroke="#ccc"
            dot={{ stroke: "#000", strokeWidth: 1.4, r: 3 }}
            activeDot={{
              fill: activeDotFillColor,
              stroke: activeDotStrokeColor,
              strokeWidth: 10,
              strokeOpacity: 0.3,
              r: 5
            }}
          />
          <Tooltip
            active={true}
            content={() => {}}
            cursor={{
              stroke: activeDotFillColor
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

WeeklyGraph.propTypes = {
  weeklyScores: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  snapToPoint: PropTypes.func.isRequired
};

export default WeeklyGraph;
