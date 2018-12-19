/* eslint-disable */
import axios from 'axios';
import { OK } from 'http-status';

import HttpStationQueryError from 'infrastructure/bicingApi/errors/HttpStationQueryError';

/** @todo make this class as a service (singleton) as pass API_URL threw construction */
class HttpStationQuery {
  static findAll(byFilter = null) {
    let filter = '';

    if (byFilter) {
      filter = `geo_location_filter=${byFilter.latitude},${byFilter.longitude},${byFilter.limit}`;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BICING_API_URL}/stations?${filter}`)
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

  static find(stationId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BICING_API_URL}/stations/${stationId}`)
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

export default HttpStationQuery;
