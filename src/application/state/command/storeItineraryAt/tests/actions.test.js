import * as actions from 'application/state/command/storeItineraryAt/actions';
import { STORE } from 'application/state/command/storeItineraryAt/types';
import { isFSA } from 'flux-standard-action';
import moment from 'moment';
import ByItineraryAtFilterBuilder from 'application/state/filter/tests/support/ByItineraryAtFilterBuilder';

describe('application/state/command/storeItineraryAt/actions', () => {
  test('should create an action to start storing itineraryAt with function storeStart()', () => {
    const itineraryAt = moment();
    const action = actions.storeStart(itineraryAt);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      payload: itineraryAt,
      type: STORE.START,
    });
  });
  test('should create an action to notify a successful storing itineraryAt with function storeSuccess()', async () => {
    const filter = await ByItineraryAtFilterBuilder.create().build();
    const action = actions.storeSuccess(filter);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: false,
      payload: filter,
      type: STORE.SUCCESS,
    });
  });
  test('should create an action to notify a failure storing itineraryAt with function storeFailure()', () => {
    const error = new Error('An error occurred');
    const action = actions.storeFailure(error);

    expect(isFSA(action)).toEqual(true);
    expect(action).toEqual({
      error: true,
      payload: error,
      type: STORE.FAILURE,
    });
  });
});
