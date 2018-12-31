import * as selectors from 'application/state/query/station/selectors';

describe('application/state/query/station/selectors', () => {
  test('it can return error flag', () => {
    const state = { query: { station: { error: true } } };

    expect(selectors.error(state)).toBeTruthy();
  });
  test('it can return isFetching flag', () => {
    const state = { query: { station: { isFetching: true } } };

    expect(selectors.isFetching(state)).toBeTruthy();
  });
  test('it can return station data', () => {
    const data = ['station'];
    const state = { query: { station: { data } } };

    expect(selectors.data(state)).toEqual(data);
  });
  test('it can return station name', () => {
    const name = 'station tarragonna';
    const state = { query: { station: { data: { name } } } };

    expect(selectors.name(state)).toEqual(name);
  });
  test('it can return station type', () => {
    const type = 'BIKE';
    const state = { query: { station: { data: { type } } } };

    expect(selectors.type(state)).toEqual(type);
  });
  test('it can return station address', () => {
    const address = 'Ramiro';
    const state = { query: { station: { data: { address } } } };

    expect(selectors.address(state)).toEqual(address);
  });
  test('it can return station address', () => {
    const addressNumber = '14';
    const state = { query: { station: { data: { addressNumber } } } };

    expect(selectors.addressNumber(state)).toEqual(addressNumber);
  });
  test('it can return station address', () => {
    const zipCode = '08014';
    const state = { query: { station: { data: { zipCode } } } };

    expect(selectors.zipCode(state)).toEqual(zipCode);
  });
});
