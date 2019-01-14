import { FLOW } from 'application/state/flow/map/types';

export const flow = (
  itineraryStep,
  itineraryAt,
  periodStartAt,
  periodEndAt,
  interval,
  latitude,
  longitude,
  limit,
) => ({
  payload: {
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  },
  type: FLOW.START,
});

export default flow;
