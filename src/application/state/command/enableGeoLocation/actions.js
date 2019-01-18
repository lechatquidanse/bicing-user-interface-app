import { ENABLE } from 'application/state/command/enableGeoLocation/types';

export const enable = itineraryStep => ({
  payload: { itineraryStep },
  type: ENABLE.START,
});

export default enable();
