import PropTypes from 'prop-types';
import React from 'react';
import { GoogleMap as GoogleMapTemplate } from 'react-google-maps';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM,
} from 'domain/definitions/configurationMapDefinition';

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
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  zoom: PropTypes.number,
  onMapClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

GoogleMap.defaultProps = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  zoom: DEFAULT_ZOOM,
  children: undefined,
};

export default GoogleMap;
