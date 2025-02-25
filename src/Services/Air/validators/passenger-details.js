const { AirValidationError } = require('../AirErrors');

const dobToAge = (birthDate, departDate) => {
  if (!birthDate) {
    return null;
  }
  return Math.floor((departDate - new Date(birthDate).getTime()) / 3.15576e+10);
}

module.exports = (params) => {
  if (Object.prototype.toString.call(params.passengers) !== '[object Array]') {
    throw new AirValidationError.PassengersHashMissing(params);
  }

  const departDate = new Date(params.segments[0].departure).getTime();
  params.passengers.forEach((passenger) => {
    const ageCategory = passenger.ageCategory;
    if (Object.prototype.toString.call(ageCategory) !== '[object String]'
      || ageCategory.length !== 3
    ) {
      throw new AirValidationError.PassengersCategoryInvalid(passenger);
    }
    const age = passenger.age ?? dobToAge(passenger.birthDate, departDate);
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
    const {title, firstName, lastName} = passenger;
    if (Object.prototype.toString.call(title) !== '[object String]'
      || !['Mr', 'Mrs', 'Mstr', 'Ms', 'Dr', 'Prof'].includes(title)
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if (Object.prototype.toString.call(firstName) !== '[object String]'
      || firstName.length < 1
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if (Object.prototype.toString.call(lastName) !== '[object String]'
      || lastName.length < 1
    ) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
    if ((firstName+lastName).length < 3) {
      throw new AirValidationError.PassengersNameInvalid(passenger);
    }
  });
};
