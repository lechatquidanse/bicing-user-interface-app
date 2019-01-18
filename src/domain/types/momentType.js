import Joi from 'joi';
import moment from 'moment';

const momentType = Joi.object().type(moment, 'moment').required();

export default momentType;
