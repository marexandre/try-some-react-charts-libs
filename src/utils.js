export const ZONES = {
  NONE: "NONE",
  LOW: "LOW",
  OPTIMUM: "OPTIMUM",
  STEADY_PROGRESS: "STEADY_PROGRESS",
  HIGHT: "HIGHT",
  VERY_HIGHT: "VERY_HIGHT"
};

export function getZone(value, buckets) {
  if (value === 0) {
    return ZONES.NONE;
  } else if (value < buckets[0]) {
    return ZONES.LOW;
  } else if (buckets[0] <= value && value < buckets[1]) {
    return ZONES.OPTIMUM;
  } else if (buckets[1] <= value && value < buckets[2]) {
    return ZONES.STEADY_PROGRESS;
  } else if (buckets[2] <= value && value < buckets[3]) {
    return ZONES.HIGHT;
  } else if (buckets[3] <= value) {
    return ZONES.VERY_HIGHT;
  }
}

export function getDayFromIndex(i) {
  switch (i) {
    case 0:
      return "M";
    case 1:
      return "T";
    case 2:
      return "W";
    case 3:
      return "T";
    case 4:
      return "F";
    case 5:
      return "S";
    case 6:
      return "S";
    default:
      return "";
  }
}

export function getDate(d) {
  return new Date(d.year, 0, (d.week - 1) * 7);
}

const noActivityPointColor = "rgba(241, 241, 246, 1)";
const noActivityPointLigthColor = "rgba(241, 241, 246, .3)";

const lowTraningZoneColor = "rgba(174, 157, 255, 1)";
const lowTraningZoneLightColor = "rgba(174, 157, 255, .3)";

const optimumZoneColor = "rgba(176, 60, 255, 1)";
const optimumZoneLigthColor = "rgba(176, 60, 255, .3)";

const highZoneColor = "rgba(189, 12, 15, 1)";
const highZoneLigthColor = "rgba(189, 12, 15, .3)";

export function getFillColor(value, buckets) {
  const zone = getZone(value, buckets);

  switch (zone) {
    case ZONES.NONE:
      return noActivityPointColor;
    case ZONES.LOW:
      return lowTraningZoneColor;
    case ZONES.OPTIMUM:
    case ZONES.STEADY_PROGRESS:
      return optimumZoneColor;
    case ZONES.HIGHT:
    case ZONES.VERY_HIGHT:
      return highZoneColor;
    default:
      return "";
  }
}

export function getStrokeColor(value, buckets) {
  const zone = getZone(value, buckets);

  switch (zone) {
    case ZONES.NONE:
      return noActivityPointLigthColor;
    case ZONES.LOW:
      return lowTraningZoneLightColor;
    case ZONES.OPTIMUM:
    case ZONES.STEADY_PROGRESS:
      return optimumZoneLigthColor;
    case ZONES.HIGHT:
    case ZONES.VERY_HIGHT:
      return highZoneLigthColor;
    default:
      return "";
  }
}
