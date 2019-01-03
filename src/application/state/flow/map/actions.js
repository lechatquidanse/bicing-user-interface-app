import { FLOW } from 'application/state/flow/map/types';

export const flow = (latitude, longitude, limit) => ({
  payload: { latitude, longitude, limit },
  type: FLOW.START,
});

export default flow;
