import * as actions from 'application/state/command/map/actions';
import operation, { display } from 'application/state/command/map/operations';
import { DISPLAY } from 'application/state/command/map/types';
import { testSaga } from 'redux-saga-test-plan';

describe('application/state/command/map/operations', () => {
  test('should wait for a display start event to display with operation()', () => {
    testSaga(operation)
      .next()
      .takeLatestEffect(DISPLAY.START, display);
  });

  test('should notify success display with display() generator', () => {
    // const filter = byGeoLocationFilter(41.356, 2.1234, 200);
    // const action = {
    //   error: false,
    //   payload: { byGeoLocationFilter: filter },
    //   meta: { isDisplaying: true },
    //   type: DISPLAY.START,
    // };

    testSaga(display)
      .next()
      .put(actions.displaySuccess());
  });

  // test('should handle error when api call failed in fetch() generator', () => {
  //   const error = new Error('error_api_call')
  //
  //   return expectSaga(fetch)
  //     .provide([
  //       [matchers.call.fn(HttpAvailabilityQuery.findAll), throwError(error)],
  //     ])
  //     .put(actions.fetchFailure(error))
  //     .run()
  // })
});
