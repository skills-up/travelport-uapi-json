module.exports = (params) => {
  params.optionalServices = params.optionalServices.map((optionalService) => {
    optionalService.refs = (optionalService.refs || []).map((ref) => {
      if (ref.segment !== undefined) {
        const segKey = Object.keys(params['air:AirSegment'])[ref.segment];
        ref.segmentRef = params['air:AirSegment'][segKey].Key;
        delete (ref.segment);
      }
      if (ref.passenger !== undefined) {
        ref.passengerRef = params.passengerKeys[`P_${ref.passenger}`];
        delete (ref.passenger);
      }
      return ref;
    });

    return optionalService;
  });
  return params;
};
