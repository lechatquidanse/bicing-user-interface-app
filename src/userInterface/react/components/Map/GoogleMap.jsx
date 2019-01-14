import PropTypes from 'prop-types';
import React from 'react';
import { GoogleMap as GoogleMapTemplate } from 'react-google-maps';
import { DEFAULT_ZOOM } from 'domain/definitions/configurationMapDefinition';

const GoogleMap = ({
  latitude,
  longitude,
  zoom,
  onMapClick,
  children,
}) => (
  <GoogleMapTemplate
    zoom={zoom}
    center={{ lat: latitude, lng: longitude }}
    onClick={onMapClick}
  >
    {children}
  </GoogleMapTemplate>
);

GoogleMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  onMapClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

GoogleMap.defaultProps = {
  zoom: DEFAULT_ZOOM,
  children: undefined,
};

export default GoogleMap;
