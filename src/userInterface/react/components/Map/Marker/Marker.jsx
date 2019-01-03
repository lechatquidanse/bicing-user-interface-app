import { STATUS_ALLOWED, STATUS_CLOSED } from 'domain/definitions/availabilityDefinition';
import { TYPE_ALLOWED, TYPE_BIKE } from 'domain/definitions/stationDefinition';
import {
  func, node, number, oneOf, string,
} from 'prop-types';
import React from 'react';
import { Marker as BaseMarker } from 'react-google-maps';
import MarkerIcon from 'userInterface/react/components/Map/Marker/MarkerIcon';

const Marker = ({
  stationId,
  type,
  latitude,
  longitude,
  status,
  availableBikeNumber,
  availableSlotNumber,
  onMarkerClick,
  children,
}) => (
  <BaseMarker
    icon={MarkerIcon(type, status, availableBikeNumber, availableSlotNumber)}
    position={{ lat: latitude, lng: longitude }}
    onClick={onMarkerClick}
  >
    {React.cloneElement(children, {
      stationId,
    })}
  </BaseMarker>
);

Marker.propTypes = {
  stationId: string.isRequired,
  latitude: number.isRequired,
  longitude: number.isRequired,
  type: oneOf(TYPE_ALLOWED),
  status: oneOf(STATUS_ALLOWED),
  availableBikeNumber: number,
  availableSlotNumber: number,
  onMarkerClick: func.isRequired,
  children: node.isRequired,
};

Marker.defaultProps = {
  type: TYPE_BIKE,
  status: STATUS_CLOSED,
  availableBikeNumber: 0,
  availableSlotNumber: 0,
};

export default Marker;
