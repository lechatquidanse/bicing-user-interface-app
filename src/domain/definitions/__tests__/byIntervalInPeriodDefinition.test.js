import { defaultInputDateSelectOptions } from 'domain/definitions/byIntervalInPeriodDefinition';
import MockDate from 'mockdate';

describe('domain/definitions/byIntervalInPeriodDefinition', () => {
  test('defaultInputDateSelectOptions() should create next 7 days', () => {
    MockDate.set('2000-11-27 12:12:12');

    expect(defaultInputDateSelectOptions()).toEqual([
      { label: 'Today', value: '2000-11-27' },
      { label: 'Tomorrow', value: '2000-11-28' },
      { label: 'Wednesday', value: '2000-11-29' },
      { label: 'Thursday', value: '2000-11-30' },
      { label: 'Friday', value: '2000-12-01' },
      { label: 'Saturday', value: '2000-12-02' },
      { label: 'Sunday', value: '2000-12-03' },
    ]);
  });

  afterEach(() => {
    MockDate.reset();
  });
});
