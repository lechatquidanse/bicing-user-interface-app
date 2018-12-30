import { STATUS_ALLOWED } from 'domain/definitions/availabilityDefinition';
import Joi from 'joi';

const availabilityType = Joi.object().keys({
  id: Joi.string().guid({version: ['uuidv4']}).required(),
  status: Joi.string().valid(STATUS_ALLOWED),
  availableBikeNumber: Joi.number().required(),
  availableSlotNumber: Joi.number().required(),
  statedAt: Joi.string().required(),
}).unknown(true);

const availabilitiesType = Joi.array().items(availabilityType);

export {
  availabilityType,
  availabilitiesType,
};
