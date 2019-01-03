import Joi from 'joi';

const prediction = Joi.object().keys({
  available_bike_number: Joi.number().required(),
  available_slot_number: Joi.number().required(),
  forecast_at: Joi.string().required(),
  status: Joi.string().required(),
}).unknown(true);

export const predictionsType = Joi.array().items(prediction).required();
export const stationIdType = Joi.string().required();
