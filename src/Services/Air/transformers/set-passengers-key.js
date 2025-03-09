module.exports = (params) => {
  if (!params.passengerKeys) {
    return params;
  }
  params.passengers = params.passengers.map((passenger, index) => {
    if (! passenger.Key) {
      passenger.Key = params.passengerKeys[`P_${index}`];
    }
    return passenger;
  });
  return params;
};
