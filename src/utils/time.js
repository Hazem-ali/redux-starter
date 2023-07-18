import moment from "moment";

export const isMinutesPassed = (timestamp, thresholdInMinutes) => {
  const diffInMinutes = moment().diff(moment(timestamp), "minutes");
  return diffInMinutes > thresholdInMinutes;
};
