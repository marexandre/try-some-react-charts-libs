import React from "react";
import PropTypes from "prop-types";

import { getZone, ZONES } from "./utils";

class TrainingSuggestion extends React.Component {
  getProgressTitleText = (value, buckets) => {
    const zone = getZone(value, buckets);

    switch (zone) {
      case ZONES.NONE:
        return "No heart rate activities";
      case ZONES.LOW:
        return "Below weekly range";
      case ZONES.OPTIMUM:
        return "Consistent training";
      case ZONES.STEADY_PROGRESS:
        return "Steady progress";
      case ZONES.HIGHT:
        return "Above weekly range";
      case ZONES.VERY_HIGHT:
        return "Well above weekly range";
      default:
        return "";
    }
  };

  getProgressDescriptionText = (value, buckets) => {
    const zone = getZone(value, buckets);

    switch (zone) {
      case ZONES.NONE:
        return "Upload a workout to start your week.";
      case ZONES.LOW:
        return `Your activity level has been lighter than average. If you are recovering, try to stay under ${parseInt(
          buckets[0],
          10
        )}.`;
      case ZONES.OPTIMUM:
        return `You're right in the zone this week. This is an effective way to maintain fitness while minimizing recovery time.`;
      case ZONES.STEADY_PROGRESS:
        return `You're building fitness nicely. Try to keep the remainder of the week under ${parseInt(
          buckets[2],
          10
        )}.`;
      case ZONES.HIGHT:
        return `You've ramped up your effort this week. Pay close attention to your body's feedback and recover as needed.`;
      case ZONES.VERY_HIGHT:
        return `You've made a substantial jump compared to previous weeks. Be cautious of overtraining and give yourself ample recovery time.`;
      default:
        return "";
    }
  };
  render() {
    const { cumulativeScore, buckets } = this.props;

    return (
      <React.Fragment>
        <h2>{cumulativeScore}</h2>
        <h4>{this.getProgressTitleText(cumulativeScore, buckets)}</h4>
        <div style={{ minHeight: "68px" }}>
          {this.getProgressDescriptionText(cumulativeScore, buckets)}
        </div>
      </React.Fragment>
    );
  }
}

TrainingSuggestion.propTypes = {
  cumulativeScore: PropTypes.number.isRequired,
  buckets: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default TrainingSuggestion;
