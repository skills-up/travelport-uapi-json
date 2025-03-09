const moment = require('moment');

module.exports = (params) => {
  let refDate = moment();
  if (params.segments?.length) {
    refDate = moment(params.segments[0].departure);
  }
  params.passengers = params.passengers.map((passenger) => {
    const birth = moment(passenger.birthDate.toUpperCase(), 'YYYY-MM-DD');
    passenger.Age = refDate.diff(birth, 'years');
    return passenger;
  });
  return params;
};
