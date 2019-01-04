import availabilitiesClientFactory
  from 'application/state/query/availabilities/provider/availabilitiesClientFactory';

const availabilitiesProvider = (periodStart, periodEnd, interval, stationIds) => {
  const client = availabilitiesClientFactory(periodStart, periodEnd, interval, stationIds);

  return client.find();
};

export default availabilitiesProvider;
