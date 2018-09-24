import React from "react";
import PropTypes from "prop-types";

import TrainingSuggestion from "../TrainingSuggestion";
import WeekChart from "./WeekChart";
import WeeklyGraph from "./WeeklyGraph";

class RechartsExample extends React.Component {
  constructor(props) {
    super(props);

    const weeklyScores = props.weeklyScores;
    const defaultIndex = weeklyScores.length - 1;

    this.state = {
      weeklyScores,
      selectedWeek: weeklyScores[defaultIndex]
    };
  }

  snapToPoint = (index, data) => {
    this.setState({ selectedWeek: data });
  };

  render() {
    const { weeklyScores, selectedWeek } = this.state;

    return (
      <div>
        <TrainingSuggestion
          cumulativeScore={selectedWeek.cumulative_score}
          buckets={selectedWeek.buckets}
        />

        <WeekChart dailyScores={selectedWeek.daily_scores} />

        <WeeklyGraph
          weeklyScores={weeklyScores}
          snapToPoint={this.snapToPoint}
        />
      </div>
    );
  }
}

RechartsExample.propTypes = {
  weeklyScores: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default RechartsExample;
