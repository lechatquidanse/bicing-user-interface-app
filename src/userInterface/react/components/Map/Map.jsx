/* eslint-disable */
import stationType from 'domain/types/stationType';
import {
  arrayOf, func, number, shape, string,
} from 'prop-types';
import React from 'react';
import { GoogleMap } from 'react-google-maps';
import Marker from 'userInterface/react/components/Marker';

const zoom = (limit) => {
  if (limit < 1000) {
    return 15;
  }
  if (limit >= 1000) {
    return 12;
  }
};

const Map = ({
  stations,
  mapDisplayConfiguration,
  markerActive,
  onMapClick,
  onMarkerClick,
  onInfoWindowCloseClick,
  onInfoWindowViewMoreClick,
}) => (
  <GoogleMap
    defaultZoom={zoom(mapDisplayConfiguration.limit)}
    defaultCenter={{
      lat: mapDisplayConfiguration.latitude,
      lng: mapDisplayConfiguration.longitude,
    }}
    onClick={() => onMapClick()}
  >
    {stations.map(station => (
      <Marker
        key={station.id}
        markerId={station.id}
        station={station}
        markerActive={markerActive}
        onMarkerClick={onMarkerClick}
        onInfoWindowCloseClick={onInfoWindowCloseClick}
        onInfoWindowViewMoreClick={onInfoWindowViewMoreClick}
      />
    ))}
  </GoogleMap>
);

Map.propTypes = {
  stations: arrayOf(stationType).isRequired,
  mapDisplayConfiguration: shape({
    latitude: number,
    longitude: number,
    limit: number,
  }),
  markerActive: string,
  onMapClick: func.isRequired,
  onMarkerClick: func.isRequired,
  onInfoWindowCloseClick: func.isRequired,
  onInfoWindowViewMoreClick: func.isRequired,
};

Map.defaultProps = {
  mapDisplayConfiguration: { latitude: 41.390205, longitude: 2.154007, limit: 1000 },
  markerActive: null,
};

export default Map;
