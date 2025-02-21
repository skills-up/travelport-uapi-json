const { AirValidationError } = require('../AirErrors');

module.exports = (params) => {
  if (Object.prototype.toString.call(params.passengers) !== '[object Array]') {
    throw new AirValidationError.PassengersHashMissing(params);
  }

  params.passengers.forEach((passenger) => {
    console.log('Passenger', passenger);
    const ageCategory = passenger.ageCategory;
    if (Object.prototype.toString.call(ageCategory) !== '[object String]'
      || ageCategory.length !== 3
    ) {
      throw new AirValidationError.PassengersCategoryInvalid(passenger);
    }
    const age = passenger.age ?? (ageCategory === 'ADT' ? 40 : null);
    if (Object.prototype.toString.call(age) !== '[object Number]') {
      throw new AirValidationError.PassengersAgeInvalid(passenger);
    }
    if (ageCategory === 'ADT' && (age < 12)) {
      throw new AirValidationError.PassengersCategoryInvalid(passenger);
    }
    if (ageCategory === 'CHD' && (age < 2 || age > 12)) {
      throw new AirValidationError.PassengersCategoryInvalid(passenger);
    }
    if (ageCategory === 'INF' && (age < 0 || age > 1)) {
      throw new AirValidationError.PassengersCategoryInvalid(passenger);
    }
    const name = passenger.name;
    if (Object.prototype.toString.call(name) !== '[object Object]') {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    const {Prefix, First, Last} = name;
    if (Object.prototype.toString.call(Prefix) !== '[object String]'
      || !['Mr', 'Mrs', 'Mstr', 'Ms', 'Dr', 'Prof'].includes(Prefix)
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if (Object.prototype.toString.call(First) !== '[object String]'
      || First.length < 1
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if (Object.prototype.toString.call(Last) !== '[object String]'
      || Last.length < 1
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if ((First+Last).length < 3) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
  });
};
