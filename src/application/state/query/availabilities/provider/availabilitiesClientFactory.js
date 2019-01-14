import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import { HttpAvailabilitiesQuery } from 'infrastructure/bicingApi';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';

const availabilitiesClientFactory = (itineraryAt, periodStart, periodEnd, interval, stationIds) => {
  const filter = ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval);

  if (filter.isForecasting(itineraryAt) === true) {
    return new HttpAvailabilitiesForecastQuery(stationIds, filter);
  }

  return new HttpAvailabilitiesQuery();
};

export default availabilitiesClientFactory;
