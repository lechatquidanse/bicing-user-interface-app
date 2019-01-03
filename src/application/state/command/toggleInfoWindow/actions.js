import { TOGGLE } from 'application/state/command/toggleInfoWindow/types';

export const toggle = (key = null) => ({
  payload: { key },
  type: TOGGLE.START,
});

export default toggle;
