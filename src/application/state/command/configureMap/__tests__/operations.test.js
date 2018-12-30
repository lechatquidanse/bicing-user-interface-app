import * as actions from 'application/state/command/configureMap/actions';
import operation, { configure } from 'application/state/command/configureMap/operations';
import { CONFIGURE } from 'application/state/command/configureMap/types';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { fetch } from 'application/state/query/stations/operations';

describe('application/state/command/configureMap/operations', () => {
  test('should wait for a configure start event to configure map with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(CONFIGURE.START, configure);
  });

  test('should notify success configuration with configure() generator', () => {
    const action = {
      error: false,
      payload: { latitude: 41.356, longitude: 2.1234, limit: 200 },
      type: CONFIGURE.START,
    };
    const expectedConfiguration = 12;

    expectSaga(fetch, action)
      .put(actions.configureSuccess(expectedConfiguration))
      .run();
  });


  test('should handle error when byGeoLocationFilter creation is not validated', () => {
    const action = {
      error: false,
      payload: { latitude: 'bad_value', longitude: 'bad_value', limit: 'bad_value' },
      type: CONFIGURE.START,
    };

    return expectSaga(fetch, action)
      .run()
      .then((result) => {
        expect(result.toJSON()).toMatchSnapshot();
      });
  });
});
