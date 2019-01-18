import * as actions from 'application/state/command/storeItineraryGeoLocation/actions';
import { STORE } from 'application/state/command/storeItineraryGeoLocation/types';
import { isFSA } from 'flux-standard-action';
import ByItineraryGeoLocationFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryGeoLocationFilterBuilder';

describe('application/state/command/storeItineraryGeoLocation/actions', () => {
  test('should create an action to start storing GeoLocation with function storeStart()', () => {
    const itineraryStep = 1;
    const latitude = 41.321;
    const longitude = 2.1234;
    const limit = 1000;
    const action = actions.storeStart(itineraryStep, latitude, longitude, limit);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      meta: itineraryStep,
      payload: { latitude, longitude, limit },
      type: STORE.START,
    });
  });
  test('should create an action to notify a successful storing GeoLocation with function storeSuccess()', async () => {
    const itineraryStep = 1;
    const filter = await ByItineraryGeoLocationFilterBuilder.create().build();
    const action = actions.storeSuccess(itineraryStep, filter);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      meta: itineraryStep,
      payload: filter,
      type: STORE.SUCCESS,
    });
  });
  test('should create an action to notify a failure storing GeoLocation with function storeFailure()', () => {
    const itineraryStep = 1;
    const error = new Error('An error occurred');
    const action = actions.storeFailure(itineraryStep, error);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: true,
      meta: itineraryStep,
      payload: error,
      type: STORE.FAILURE,
    });
  });
});
