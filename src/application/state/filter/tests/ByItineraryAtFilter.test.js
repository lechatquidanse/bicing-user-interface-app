import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import ByItineraryAtFilterError from 'application/state/filter/error/ByItineraryAtFilterError';
import moment from 'moment';

describe('application/state/filter/ByItineraryAtFilter', () => {
  test('it can be created from raw values', async () => {
    const itineraryAt = moment();
    const periodStartAt = moment();
    const periodEndAt = moment();
    const interval = '5T';

    const filter = await ByItineraryAtFilter.fromRawValues(
      itineraryAt,
      periodStartAt,
      periodEndAt,
      interval,
    );

    expect(filter.itineraryAt).toEqual(itineraryAt);
    expect(filter.periodStartAt).toEqual(periodStartAt);
    expect(filter.periodEndAt).toEqual(periodEndAt);
    expect(filter.interval).toEqual(interval);
  });
  test('it can not be created with bad itineraryAt type', async () => {
    await expect(ByItineraryAtFilter.fromRawValues(
      new Error('not a date type'),
      moment(),
      moment(),
      '5T',
    )).rejects
      .toEqual(ByItineraryAtFilterError.withInvalidTypeFilter('"itineraryAt" must be an instance of "moment"'));
  });
  test('it can not be created with itineraryAt outside [periodStartAt, periodEndAt]', async () => {
    await expect(ByItineraryAtFilter.fromRawValues(
      moment('20001031', 'YYYYMMDD'),
      moment('20111031', 'YYYYMMDD'),
      moment('20121031', 'YYYYMMDD'),
      '5T',
    )).rejects
      .toEqual(ByItineraryAtFilterError.withInvalidValueFilter('"itinerary" must be larger than or equal to 1320019200'));
  });
  test('it can not be created with periodStartAt > periodEndAt', async () => {
    await expect(ByItineraryAtFilter.fromRawValues(
      moment('20121031', 'YYYYMMDD'),
      moment('20151031', 'YYYYMMDD'),
      moment('20121031', 'YYYYMMDD'),
      '5T',
    )).rejects
      .toEqual(ByItineraryAtFilterError.withInvalidValueFilter('"periodEnd" must be larger than or equal to 1446249600'));
  });
  test('it can inform it is a forecast filter when itineraryAt > now and periodEndAt > periodStartAt', async () => {
    const itineraryAt = moment().add(1, 'minute');
    const periodStartAt = itineraryAt.clone().subtract(1, 'minute');
    const periodEndAt = itineraryAt.clone().add(1, 'minute');

    const filter = await ByItineraryAtFilter.fromRawValues(
      itineraryAt,
      periodStartAt,
      periodEndAt,
      '5T',
    );

    expect(filter.isForecasting()).toEqual(true);
  });
  test('it can inform it is not a forecast filter when itineraryAt < now', async () => {
    const itineraryAt = moment().subtract(1, 'minute');
    const periodStartAt = itineraryAt.clone().subtract(1, 'minute');
    const periodEndAt = itineraryAt.clone().add(1, 'minute');

    const filter = await ByItineraryAtFilter.fromRawValues(
      itineraryAt,
      periodStartAt,
      periodEndAt,
      '5T',
    );

    expect(filter.isForecasting()).toEqual(false);
  });
  test('it can inform it is not a forecast filter when itineraryAt > now but periodStartAt == periodEndAt', async () => {
    const itineraryAt = moment().add(1, 'minute');
    const periodStartAt = itineraryAt.clone();
    const periodEndAt = itineraryAt.clone();

    const filter = await ByItineraryAtFilter.fromRawValues(
      itineraryAt,
      periodStartAt,
      periodEndAt,
      '5T',
    );

    expect(filter.isForecasting()).toEqual(false);
  });
});
