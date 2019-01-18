import { TYPE_ALLOWED } from 'domain/definitions/stationDefinition';
import Joi from 'joi';

const stationIdType = Joi.string().guid({ version: ['uuidv4'] }).required();

const stationType = Joi.object().keys({
  id: stationIdType,
  name: Joi.string().required(),
  type: Joi.string().valid(TYPE_ALLOWED),
  address: Joi.string(),
  addressNumber: Joi.string().allow(null),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  zipCode: Joi.string().allow(null),
}).unknown(true);

const stationsType = Joi.array().items(stationType);

export {
  stationIdType,
  stationType,
  stationsType,
};
