import { STATUS_ALLOWED, STATUS_CLOSED } from 'domain/definitions/availabilityDefinition';
import { TYPE_ALLOWED, TYPE_BIKE } from 'domain/definitions/stationDefinition';
import PropTypes from 'prop-types';
import React from 'react';
import { Marker as BaseMarker } from 'react-google-maps';
import MarkerIcon from 'userInterface/react/components/Map/Marker/MarkerIcon';

const Marker = ({
  itineraryStep,
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
    {React.cloneElement(children, { itineraryStep, stationId })}
  </BaseMarker>
);

Marker.propTypes = {
  itineraryStep: PropTypes.number.isRequired,
  stationId: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  type: PropTypes.oneOf(TYPE_ALLOWED),
  status: PropTypes.oneOf(STATUS_ALLOWED),
  availableBikeNumber: PropTypes.number,
  availableSlotNumber: PropTypes.number,
  onMarkerClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Marker.defaultProps = {
  type: TYPE_BIKE,
  status: STATUS_CLOSED,
  availableBikeNumber: 0,
  availableSlotNumber: 0,
};

export default Marker;
