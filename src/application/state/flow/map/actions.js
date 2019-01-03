import { FLOW } from 'application/state/flow/map/types';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LIMIT,
  DEFAULT_LONGITUDE,
} from 'domain/definitions/configurationMapDefinition';

export const flow = (
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONGITUDE,
  limit = DEFAULT_LIMIT,
) => ({
  payload: { latitude, longitude, limit },
  type: FLOW.START,
});

export default flow;
