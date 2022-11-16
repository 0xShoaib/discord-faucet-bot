import moment from "moment";

export const checkTimeRestrictionForFaucet = async (
  fundLastRequestDate: Date,
  cooldown: number
): Promise<{
  isTimeRestrictionForFaucet: boolean;
  duration: moment.Duration;
}> => {
  const nextFundRequestTimeInUnix = moment(fundLastRequestDate)
    .add(cooldown, "hours")
    .unix();

  const currentTimeInUnix = moment().unix();

  const diffTime = nextFundRequestTimeInUnix - currentTimeInUnix;

  const duration = moment.duration(diffTime * 1000, "milliseconds");

  return {
    isTimeRestrictionForFaucet: diffTime > 0,
    duration,
  };
};
