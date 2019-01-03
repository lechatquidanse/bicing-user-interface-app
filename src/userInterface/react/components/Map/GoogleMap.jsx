import { func, node, number } from 'prop-types';
import React from 'react';
import { GoogleMap as GoogleMapTemplate } from 'react-google-maps';

const GoogleMap = ({
  latitude,
  longitude,
  zoom,
  onMapClick,
  children,
}) => (
  <GoogleMapTemplate
    zoom={zoom}
    center={{
      lat: latitude,
      lng: longitude,
    }}
    onClick={onMapClick}
  >
    {children}
  </GoogleMapTemplate>
);

GoogleMap.propTypes = {
  latitude: number,
  longitude: number,
  zoom: number,
  onMapClick: func.isRequired,
  children: node.isRequired,
};

GoogleMap.defaultProps = {
  latitude: 41.390205,
  longitude: 2.154007,
  zoom: 12,
};

export default GoogleMap;
