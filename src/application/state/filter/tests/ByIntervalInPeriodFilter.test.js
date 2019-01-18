import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import ByIntervalInPeriodFilterError from 'application/state/filter/error/ByIntervalInPeriodFilterError';
import MockDate from 'mockdate';
import moment from 'moment';

describe('application/state/filter/ByIntervalInPeriodFilter', () => {
  test('it can be created from raw values', async () => {
    const periodStartAt = moment().subtract('2', 'week');
    const periodEndAt = moment().subtract('1', 'week');
    const interval = '5 min';

    const filter = await ByIntervalInPeriodFilter.fromRawValues(
      periodStartAt,
      periodEndAt,
      interval,
    );

    expect(filter.periodStartAt).toEqual(periodStartAt);
    expect(filter.periodEndAt).toEqual(periodEndAt);
    expect(filter.interval).toEqual(interval);
  });
  test('it can not be created with bad itineraryAt type', async () => {
    await expect(ByIntervalInPeriodFilter.fromRawValues(
      new Error('not a date type'),
      moment().subtract('1', 'week'),
      '5 min',
    )).rejects
      .toEqual(ByIntervalInPeriodFilterError.withInvalidTypeFilter('"periodStartAt" must be an instance of "moment"'));
  });
  test('it can not be created with periodStartAt > periodEndAt', async () => {
    await expect(ByIntervalInPeriodFilter.fromRawValues(
      moment('20151031', 'YYYYMMDD'),
      moment('20121031', 'YYYYMMDD'),
      '5 min',
    )).rejects
      .toEqual(ByIntervalInPeriodFilterError.withInvalidValueFilter('"periodEnd" must be larger than or equal to 1446249600'));
  });
  test('it can not be created with periodStartAt > periodEndAt', async () => {
    await expect(ByIntervalInPeriodFilter.fromRawValues(
      moment('20151031', 'YYYYMMDD'),
      moment('20121031', 'YYYYMMDD'),
      '5 min',
    )).rejects
      .toEqual(ByIntervalInPeriodFilterError.withInvalidValueFilter('"periodEnd" must be larger than or equal to 1446249600'));
  });
  test('it can not be created with periodStartAt >= now', async () => {
    const periodStartAt = moment();
    const now = moment('20121031', 'YYYYMMDD');
    MockDate.set(now.toDate());

    await expect(ByIntervalInPeriodFilter.fromRawValues(
      periodStartAt,
      moment('20121031', 'YYYYMMDD'),
      '5 min',
    )).rejects
      .toEqual(ByIntervalInPeriodFilterError.withInvalidValueFilter('"periodStart" must be less than or equal to 1351641600'));
  });
  afterEach(() => {
    MockDate.reset();
  });
});
