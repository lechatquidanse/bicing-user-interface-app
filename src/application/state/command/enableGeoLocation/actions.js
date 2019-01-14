import { ENABLE } from 'application/state/command/enableGeoLocation/types';

export const enable = itineraryStep => ({
  payload: { enabled: true, itineraryStep },
  type: ENABLE.START,
});

export default enable();
