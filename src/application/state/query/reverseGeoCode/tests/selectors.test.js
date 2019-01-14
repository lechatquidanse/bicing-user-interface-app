import * as selectors from 'application/state/query/reverseGeoCode/selectors';
import StateBuilder from 'application/state/query/reverseGeoCode/tests/support/StateBuilder';

describe('application/state/query/reverseGeoCode/selectors', () => {
  test('it can return error flag', () => {
    const state = StateBuilder.create().withIsError(true).build();

    expect(selectors.isError(state)).toEqual(true);
  });
  test('it can return isFetching flag', () => {
    const state = StateBuilder.create().withIsFetching(true).build();

    expect(selectors.isFetching(state)).toEqual(true);
  });
  test('it can return reverseGeoCode address when no error', () => {
    const address = 'address at barcelona';
    const state = StateBuilder.create().withIsError(false).withAddress(address).build();

    expect(selectors.addressOrError(state)).toEqual(address);
  });
  test('it can return reverseGeoCode error when error', () => {
    const address = 'address at barcelona';
    const message = 'an error occurred';
    const state = StateBuilder.create()
      .withAddress(address)
      .withIsError(true)
      .withError(new Error(message))
      .build();

    expect(selectors.addressOrError(state)).toEqual(message);
  });
});
