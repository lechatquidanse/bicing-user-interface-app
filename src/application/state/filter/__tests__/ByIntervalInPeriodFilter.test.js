import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';

describe('application/state/filter/ByIntervalInPeriodFilter', () => {
  test('it can create a ByIntervalInPeriodFilter from raw values', () => {
    const periodStart = '2017-08-12 13:00:30'; const periodEnd = '2017-09-02 13:00:30'; const
      interval = '5 min';

    const filter = ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);

    expect(filter.periodStart).toEqual(periodStart);
    expect(filter.periodEnd).toEqual(periodEnd);
    expect(filter.interval).toEqual(interval);
  });
  test('it can return a zoom value from a ByIntervalInPeriodFilter if periodStart is not a date', () => {
    expect(() => ByIntervalInPeriodFilter.fromRawValues('not date format', '2017-09-02 13:00:30', '5 min')).toThrowErrorMatchingSnapshot();
  });
  test('it can return a zoom value from a ByIntervalInPeriodFilter if periodEnd is not a date', () => {
    expect(() => ByIntervalInPeriodFilter.fromRawValues('2017-09-02 13:00:30', 'not date format', '5 min')).toThrowErrorMatchingSnapshot();
  });
  test('it can return a zoom value from a ByIntervalInPeriodFilter if interval is not a string', () => {
    expect(() => ByIntervalInPeriodFilter.fromRawValues('2017-09-02 13:00:30', '2017-10-02 13:00:30', 12345)).toThrowErrorMatchingSnapshot();
  });
  test('it can return a zoom value from a ByIntervalInPeriodFilter if periodStart greater than periodEnd ', () => {
    expect(() => ByIntervalInPeriodFilter.fromRawValues('2019-09-02 13:00:30', '2017-10-02 13:00:30', '5 min')).toThrowErrorMatchingSnapshot();
  });
});
