import axios from 'axios';
import { OK } from 'http-status';

import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';

/** @todo make this class as a service (singleton) as pass API_URL threw construction */
class HttpStationAvailabilityQuery {
  static route(stationId, periodStart, periodEnd, interval) {
    const queries = [];

    if (periodStart) {
      queries.push(`periodStart=${periodStart}`);
    }
    if (periodEnd) {
      queries.push(`periodEnd=${periodEnd}`);
    }
    if (interval) {
      queries.push(`interval=${interval}`);
    }

    const query = queries.join('&');

    return `${process.env.REACT_APP_BICING_API_URL}/stations/${stationId}/availabilities?${query}`;
  }

  static find(stationId, periodStart, periodEnd, interval) {
    return new Promise((resolve, reject) => {
      axios
        .get(HttpStationAvailabilityQuery.route(stationId, periodStart, periodEnd, interval))
        .then(response => {
          if (OK !== response.status) {
            reject({
              error: HttpStationQueryError.withUnexpectedResponseStatus(response.status)
            });
          }
          // if () @todo add test to check if response.data
          resolve(response.data);
        }).catch(error => {
          reject({
            error: HttpStationQueryError.withRequestError(error)
          });
        })
    });
  }
}

export default HttpStationAvailabilityQuery;
