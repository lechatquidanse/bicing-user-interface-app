import axios from 'axios';
import { OK } from 'http-status';

import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';

/** @todo make this class as a service (singleton) as pass API_URL threw construction */
class HttpStationAvailabilityQuery {
  static find(stationId, periodStart, periodEnd, interval) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BICING_API_URL}/stations/${stationId}/availabilities`)
        .then(response => {
          if (OK !== response.status) {
            reject({
              error: HttpStationQueryError.withUnexpectedResponseStatus(response.status)
            });
          }
          console.log(response.data);
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
