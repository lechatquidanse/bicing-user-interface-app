import { STATUS_ALLOWED, STATUS_CLOSED } from 'domain/definitions/availabilityDefinition';
import { TYPE_ALLOWED, TYPE_BIKE } from 'domain/definitions/stationDefinition';
import {
  func, number, oneOf, string,
} from 'prop-types';
import React from 'react';
import { InfoWindow as InfoWindowBase } from 'react-google-maps';

const InfoWindow = ({
  latitude,
  longitude,
  name,
  type,
  zipCode,
  availableBikeNumber,
  availableSlotNumber,
  status,
  onInfoWindowCloseClick,
  onInfoWindowViewMoreClick,
}) => (
  <InfoWindowBase
    position={{ lat: latitude, lng: longitude }}
    onCloseClick={onInfoWindowCloseClick}
  >
    <div>
      <h6>
        {name}
        {' '}
        {zipCode}
      </h6>
      <p>
        {type}
        {' '}
        {zipCode}
      </p>
      <p>
        {availableBikeNumber}
        {' '}
        {availableSlotNumber}
      </p>
      <p>
        {status}
        {' '}
        {zipCode}
      </p>
      <button onClick={onInfoWindowViewMoreClick} type="submit">viewMore</button>
    </div>
  </InfoWindowBase>
);

InfoWindow.propTypes = {
  latitude: number.isRequired,
  longitude: number.isRequired,
  name: string.isRequired,
  zipCode: string.isRequired,
  type: oneOf(TYPE_ALLOWED),
  availableBikeNumber: number,
  availableSlotNumber: number,
  status: oneOf(STATUS_ALLOWED),
  onInfoWindowCloseClick: func.isRequired,
  onInfoWindowViewMoreClick: func.isRequired,
};

InfoWindow.defaultProps = {
  availableBikeNumber: 0,
  availableSlotNumber: 0,
  type: TYPE_BIKE,
  status: STATUS_CLOSED,
};

export default InfoWindow;
