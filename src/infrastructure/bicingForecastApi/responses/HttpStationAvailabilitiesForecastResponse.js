import {
  predictionsType,
  stationIdType,
} from 'infrastructure/bicingForecastApi/responses/httpStationAvailabilitiesForecastResponseType';
import Joi from 'joi';

class HttpStationAvailabilitiesForecastResponse {
  constructor(stationId, availabilities) {
    this.stationId = HttpStationAvailabilitiesForecastResponse.validateStationId(stationId);
    this.availabilities = HttpStationAvailabilitiesForecastResponse.validateAvailabilities(
      availabilities,
    );
  }

  static fromRawValues(stationId, availabilities) {
    return new this(stationId, availabilities);
  }

  static validateStationId(stationId) {
    return Joi.attempt(stationId, stationIdType);
  }

  static validateAvailabilities(availabilities) {
    return Joi.attempt(availabilities, predictionsType);
  }

  // @todo check if add valid model type
  toModelAvailabilities() {
    const model = [];

    this.availabilities.map((availability) => {
      model.push({
        id: this.stationId,
        availableBikeNumber: availability.available_bike_number,
        availableSlotNumber: availability.available_slot_number,
        status: availability.status,
        statedAt: availability.forecast_at,
      });

      return null;
    });

    return model;
  }
}

export default HttpStationAvailabilitiesForecastResponse;
