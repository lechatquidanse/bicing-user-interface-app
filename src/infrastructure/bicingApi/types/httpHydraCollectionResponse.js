import Joi from 'joi';

const httpHydraCollectionResponse = Joi.object().keys({
  '@context': Joi.string().required(),
  '@id': Joi.string().required(),
  '@type': Joi.string().required(),
  'hydra:member': Joi.array().required(),
}).unknown(true);

export default httpHydraCollectionResponse;
