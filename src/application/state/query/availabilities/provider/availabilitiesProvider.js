import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';

const availabilitiesProvider = (
  itineraryAt,
  periodStart,
  periodEnd,
  interval,
  stationIds,
) => availabilitiesClientFactory(
  itineraryAt,
  periodStart,
  periodEnd,
  interval,
  stationIds,
).find();

export default availabilitiesProvider;
