import { STORE } from 'application/state/command/storeItineraryStepActive/types';

export const store = itineraryStep => ({
  payload: itineraryStep,
  type: STORE.START,
});

export default store;
