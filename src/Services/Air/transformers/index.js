const convertPassengersObjectToArray = require('./convert-passengers-object-to-array');
const setBusinessFlag = require('./set-business-flag');
const setPassengersAge = require('./set-passengers-age');
const setHasFareBasisFlag = require('./set-has-farebasis-flag');
const setGroupsForSegments = require('./set-groups-for-segments');
const addMetaPassengersBooking = require('./add-meta-passengers-booking');
const setSegmentRefForSSR = require('./set-segment-ref-for-ssr');
const decodeExchangeToken = require('./decode-exchange-token');
const fixCardFop = require('./fix-card-fop');
const setSegmentRefForOptionalServices = require('./set-segment-ref-for-optional-services');
const setPassengersKey = require('./set-passengers-key');

module.exports = {
  convertPassengersObjectToArray,
  setBusinessFlag,
  setPassengersAge,
  setHasFareBasisFlag,
  setGroupsForSegments,
  addMetaPassengersBooking,
  setSegmentRefForSSR,
  decodeExchangeToken,
  fixCardFop,
  setSegmentRefForOptionalServices,
  setPassengersKey,
};
