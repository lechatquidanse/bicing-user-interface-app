import ByIntervalInPeriodFilter from 'application/state/filter/ByIntervalInPeriodFilter';
import { HttpAvailabilitiesQuery } from 'infrastructure/bicingApi';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';

const availabilitiesClientFactory = (periodStart, periodEnd, interval, stationIds) => {
  if (periodStart && periodEnd && interval) {
    return new HttpAvailabilitiesForecastQuery(
      stationIds,
      ByIntervalInPeriodFilter.fromRawValues(periodStart, periodEnd, interval),
    );
  }

  return new HttpAvailabilitiesQuery();
};

export default availabilitiesClientFactory;
