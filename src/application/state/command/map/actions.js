import { DISPLAY } from 'application/state/command/map/types';

export const displayStart = (byGeoLocationFilter = null) => ({
  error: false,
  payload: { byGeoLocationFilter },
  meta: { isDisplaying: true },
  type: DISPLAY.START,
});

export const displaySuccess = () => ({
  error: false,
  meta: { isDisplaying: false },
  type: DISPLAY.SUCCESS,
});

export const displayFailure = error => ({
  error: true,
  payload: error,
  meta: { isDisplaying: false },
  type: DISPLAY.FAILURE,
});
export const displayCancelled = () => ({
  error: false,
  meta: { isDisplaying: false },
  type: DISPLAY.CANCELLED,
});
