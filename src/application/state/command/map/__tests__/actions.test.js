import * as actions from 'application/state/command/map/actions';
import { DISPLAY } from 'application/state/command/map/types';
import { isFSA, isError } from 'flux-standard-action';

describe('application/state/query/lastAvailabilities/actions', () => {
  test('should create an action to start displaying map configuration with function displayStart()', () => {
    const action = actions.displayStart();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      payload: { byGeoLocationFilter: null },
      meta: { isDisplaying: true },
      type: DISPLAY.START,
    });
  });
  test('should create an action to cancel displaying map configuration with function displayCancelled()', () => {
    const action = actions.displayCancelled();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isDisplaying: false },
      type: DISPLAY.CANCELLED,
    });
  });
  test('should create an action to notify the success of displaying map configuration with function displaySuccess()', () => {
    const action = actions.displaySuccess();

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      meta: { isDisplaying: false },
      type: DISPLAY.SUCCESS,
    });
  });
  test('should create an action when a failure occurred during displaying map configuration with function displayFailure()', () => {
    const error = { message: 'An error occurred during fetching a displaying.' };
    const action = actions.displayFailure(error);

    expect(isError(action)).toBeTruthy();
    expect(action).toEqual({
      error: true,
      payload: error,
      meta: { isDisplaying: false },
      type: DISPLAY.FAILURE,
    });
  });
});
