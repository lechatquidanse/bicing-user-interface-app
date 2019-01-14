import HttpStationAvailabilitiesForecastQuery
  from 'infrastructure/bicingForecastApi/HttpStationAvailabilitiesForecastQuery';

// https://gist.github.com/nhagen/a1d36b39977822c224b8 to allow on query failure
// use lodash flattenDeep
class HttpAvailabilitiesForecastQuery {
  constructor(stationIds, byFilter) {
    this.stationIds = stationIds;
    this.byFilter = byFilter;

    this.find = this.find.bind(this);
  }

  find() {
    const availabilities = this.stationIds.map(
      stationId => HttpStationAvailabilitiesForecastQuery.find(stationId, this.byFilter),
    );

    return Promise.all(availabilities).then(responses => [].concat(...responses));
  }
}

export default HttpAvailabilitiesForecastQuery;
