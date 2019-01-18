import * as selectors from 'application/state/query/station/selectors';
import StateBuilder from 'application/state/query/station/tests/support/StateBuilder';
import StationBuilder from 'application/state/query/stations/tests/support/StationBuilder';
import { TYPE_BIKE } from 'domain/definitions/stationDefinition';
import AppError from 'domain/errors/AppError';

let stateBuilder; let
  stationBuilder;

describe('application/state/query/station/selectors', () => {
  test('it can return isError flag', () => {
    expect(selectors.isError(stateBuilder.withIsError(true).build())).toEqual(true);
  });
  test('it can return AppError public message if error is error type and isError true', () => {
    const error = new AppError('error', 'an error occurred during storage.');

    expect(selectors.error(stateBuilder.withIsError(true).withError(error).build()))
      .toEqual('an error occurred during storage.');
  });
  test('it can not return AppError public message if error is not AppError type ', () => {
    expect(selectors.error(stateBuilder.withIsError(true).withError('error').build())).toBeUndefined();
  });
  test('it can not return AppError public message if isError not true ', () => {
    const error = new AppError('error', 'an error occurred during storage.');

    expect(selectors.error(stateBuilder.withIsError(false).withError(error).build()))
      .toBeUndefined();
  });
  test('it can return isFetching', () => {
    expect(selectors.isFetching(stateBuilder.withIsFetching(true).build())).toEqual(true);
  });
  test('it can return name', () => {
    const name = 'Rocafort';

    expect(selectors.name(stateBuilder
      .withStation(stationBuilder.withName(name).build())
      .build())).toEqual(name);
  });
  test('it can return type', () => {
    expect(selectors.type(stateBuilder
      .withStation(stationBuilder.withType(TYPE_BIKE).build())
      .build())).toEqual(TYPE_BIKE);
  });
  test('it can return address', () => {
    const address = 'Del sol';

    expect(selectors.address(stateBuilder
      .withStation(stationBuilder.withAddress(address).build())
      .build())).toEqual(address);
  });
  test('it can return addressNumber', () => {
    const addressNumber = '5B';

    expect(selectors.addressNumber(stateBuilder
      .withStation(stationBuilder.withAddressNumber(addressNumber).build())
      .build())).toEqual(addressNumber);
  });
  test('it can return zipCode', () => {
    const zipCode = '08004';

    expect(selectors.zipCode(stateBuilder
      .withStation(stationBuilder.withZipCode(zipCode).build())
      .build())).toEqual(zipCode);
  });
  beforeEach(() => {
    stateBuilder = StateBuilder.create();
    stationBuilder = StationBuilder.create();
  });
});
