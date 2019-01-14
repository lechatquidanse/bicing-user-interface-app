import * as actions from 'application/state/command/configureMap/actions';
import { CONFIGURE } from 'application/state/command/configureMap/types';
import { isFSA, isError } from 'flux-standard-action';

describe('application/state/command/configureMap/actions', () => {
  test('should create an action to start map configuration with function configureStart()', () => {
    const latitude = 41.322; const longitude = 2.187; const
      limit = 2000;
    const action = actions.configureStart(latitude, longitude, limit);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      payload: { latitude, longitude, limit },
      type: CONFIGURE.START,
    });
  });
  test('should create an action to notify the success if map configuration with function configureSuccess()', () => {
    const zoom = 12;
    const action = actions.configureSuccess(zoom);

    expect(isFSA(action)).toBeTruthy();
    expect(action).toEqual({
      error: false,
      payload: zoom,
      type: CONFIGURE.SUCCESS,
    });
  });
  test('should create an action when a failure occurred during displaying map configuration with function configureFailure()', () => {
    const error = { message: 'An error occurred during fetching a displaying.' };
    const action = actions.configureFailure(error);

    expect(isError(action)).toBeTruthy();
    expect(action).toEqual({
      error: true,
      payload: error,
      type: CONFIGURE.FAILURE,
    });
  });
});
