import Joi from 'joi';

const stationAvailabilityType = Joi.object().keys({
  interval: Joi.date().required(),
  available_bike_avg: Joi.string().required(),
  available_bike_min: Joi.number().min(0).required(),
  available_bike_max: Joi.number().min(0).required(),
  available_slot_avg: Joi.string().required(),
  available_slot_min: Joi.number().min(0).required(),
  available_slot_max: Joi.number().min(0).required(),
});

const stationAvailabilitiesType = Joi.array().items(stationAvailabilityType);

export {
  stationAvailabilityType,
  stationAvailabilitiesType,
};
