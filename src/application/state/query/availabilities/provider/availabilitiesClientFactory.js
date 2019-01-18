import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import { HttpAvailabilitiesQuery } from 'infrastructure/bicingApi';
import { HttpAvailabilitiesForecastQuery } from 'infrastructure/bicingForecastApi';

const availabilitiesClientFactory = async (
  itineraryAt,
  periodStart,
  periodEnd,
  interval,
  stationIds) => {
  const filter = await ByItineraryAtFilter.fromRawValues(
    itineraryAt,
    periodStart,
    periodEnd,
    interval,
  );

  return filter.isForecasting() === true
    ? new HttpAvailabilitiesForecastQuery(stationIds, filter)
    : new HttpAvailabilitiesQuery();
};

export default availabilitiesClientFactory;
