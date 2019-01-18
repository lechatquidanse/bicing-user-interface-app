import * as selectors from 'application/state/command/storeItineraryAt/selectors';
import StateBuilder from 'application/state/command/storeItineraryAt/tests/support/StateBuilder';
import ByItineraryAtFilterBuilder
  from 'application/state/filter/tests/support/ByItineraryAtFilterBuilder';
import AppError from 'domain/errors/AppError';
import moment from 'moment';

let stateBuilder; let
  filterBuilder;

describe('application/state/command/storeItineraryAt/selectors', () => {
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
  test('it can return itineraryAt', async () => {
    const itineraryAt = moment();
    const filter = await filterBuilder
      .withItineraryAt(itineraryAt)
      .withPeriodStartAt(itineraryAt.clone())
      .withPeriodEndAt(itineraryAt.clone())
      .withInterval('5T')
      .build();

    expect(selectors.itineraryAt(stateBuilder.withFilter(filter).build())).toEqual(itineraryAt);
  });
  test('it can return not return itineraryAt if filter is not instance of ByItineraryAtFilter', () => {
    const filter = [];

    expect(selectors.itineraryAt(stateBuilder.withFilter(filter).build())).toBeUndefined();
  });
  test('it can not return itineraryAt if isError true', async () => {
    expect(selectors.error(stateBuilder
      .withFilter(filterBuilder.build())
      .withIsError(true)
      .build())).toBeUndefined();
  });
  test('it can return periodStartAt', async () => {
    const itineraryAt = moment();
    const periodStartAt = itineraryAt.clone().subtract(1, 'day');
    const filter = await filterBuilder
      .withItineraryAt(itineraryAt)
      .withPeriodStartAt(periodStartAt)
      .withPeriodEndAt(itineraryAt.clone())
      .build();

    expect(selectors.periodStartAt(stateBuilder.withFilter(filter).build())).toEqual(periodStartAt);
  });
  test('it can return periodEndAt', async () => {
    const itineraryAt = moment();
    const periodEndAt = itineraryAt.clone().add(1, 'day');
    const filter = await filterBuilder
      .withItineraryAt(itineraryAt)
      .withPeriodStartAt(itineraryAt.clone())
      .withPeriodEndAt(periodEndAt)
      .build();

    expect(selectors.periodEndAt(stateBuilder.withFilter(filter).build())).toEqual(periodEndAt);
  });
  test('it can return interval', async () => {
    const interval = '10T';
    const filter = await filterBuilder.withInterval(interval).build();

    expect(selectors.interval(stateBuilder.withFilter(filter).build())).toEqual(interval);
  });

  beforeEach(async () => {
    stateBuilder = await StateBuilder.create();
    filterBuilder = await ByItineraryAtFilterBuilder.create();
  });
});
