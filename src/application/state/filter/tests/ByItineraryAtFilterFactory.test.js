import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import ByItineraryAtFilterFactory from 'application/state/filter/ByItineraryAtFilterFactory';
import {
  DURATION_INTERVAL,
  DURATION_TO_PERIOD_END,
  DURATION_TO_PERIOD_START,
  INTERVAL,
} from 'domain/definitions/byItinererayAtDefinition';
import MockDate from 'mockdate';
import moment from 'moment';
import ByItineraryAtFilterFactoryError from '../error/ByItineraryAtFilterFactoryError';

const givenAnActualItineraryAt = now => now.clone().add(DURATION_INTERVAL);
const givenAForecastItineraryAt = now => givenAnActualItineraryAt(now).add(1, 'second');

describe('application/state/filter/ByItineraryAtFilterFactory', () => {
  test('it can create a ByItineraryAtFilter with same itineraryAt an period*At given an actual ItineraryAt', async () => {
    const now = moment();
    const itineraryAt = givenAnActualItineraryAt(now);

    MockDate.set(now.toDate());

    const filter = await ByItineraryAtFilterFactory.create(itineraryAt);

    expect(filter).toBeInstanceOf(ByItineraryAtFilter);
    expect(filter.itineraryAt).toEqual(itineraryAt);
    expect(filter.periodStartAt).toEqual(itineraryAt);
    expect(filter.periodEndAt).toEqual(itineraryAt);
    expect(filter.interval).toEqual(INTERVAL);
  });
  test('it can create a ByItineraryAtFilter with same itineraryAt and periodStart, periodEnd forecast given a forecast ItineraryAt', async () => {
    const now = moment();
    const itineraryAt = givenAForecastItineraryAt(now);

    MockDate.set(now.toDate());

    const filter = await ByItineraryAtFilterFactory.create(itineraryAt);

    expect(filter).toBeInstanceOf(ByItineraryAtFilter);
    expect(filter.itineraryAt).toEqual(itineraryAt);
    expect(filter.periodStartAt).toEqual(itineraryAt.clone().subtract(DURATION_TO_PERIOD_START));
    expect(filter.periodEndAt).toEqual(itineraryAt.clone().add(DURATION_TO_PERIOD_END));
    expect(filter.interval).toEqual(INTERVAL);
  });
  test('it can not be created with bad itineraryAt type', async () => {
    await expect(ByItineraryAtFilterFactory.create(new Error('not a date type')))
      .rejects
      .toEqual(ByItineraryAtFilterFactoryError.withInvalidType('"value" must be an instance of "moment"'));
  });
  afterEach(() => {
    MockDate.reset();
  });
});
