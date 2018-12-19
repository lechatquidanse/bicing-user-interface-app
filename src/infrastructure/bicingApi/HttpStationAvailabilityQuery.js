/* eslint-disable */
import axios from 'axios';
import { OK } from 'http-status';

import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';

/** @todo make this class as a service (singleton) as pass API_URL threw construction */
class HttpStationAvailabilityQuery {
  static route(stationId, byIntervalInPeriodFilter = null) {
    const queries = [];
    // const {periodStart, periodEnd, interval} = byIntervalInPeriodFilter;
    //
    // if (periodStart) {
    //   queries.push(`periodStart=${periodStart}`);
    // }
    // if (periodEnd) {
    //   queries.push(`periodEnd=${periodEnd}`);
    // }
    // if (interval) {
    //   queries.push(`interval=${interval}`);
    // }

    const query = queries.join('&');

    return `${process.env.REACT_APP_BICING_API_URL}/stations/${stationId}/availabilities?${query}`;
  }

  static find(stationId, byIntervalInPeriodFilter = null) {
    return new Promise((resolve, reject) => {
      axios
        .get(HttpStationAvailabilityQuery.route(stationId, byIntervalInPeriodFilter))
        .then((response) => {
          if (OK !== response.status) {
            reject({
              error: HttpStationQueryError.withUnexpectedResponseStatus(response.status),
            });
          }
          // if () @todo add test to check if response.data
          resolve(response.data);
        }).catch((error) => {
          reject({
            error: HttpStationQueryError.withRequestError(error),
          });
        });
    });
  }
}

export default HttpStationAvailabilityQuery;
