import React from 'react';
import { GoogleMap } from 'react-google-maps';
import { arrayOf, string, func } from 'prop-types';

import stationType from 'domain/types/stationType';
import Marker from 'userInterface/react/components/Marker';

const Map = ({
    mapDisplayConfiguration,
    stations,
    markerActive,
    onMapClick,
    onMarkerClick,
    onInfoWindowCloseClick,
    onInfoWindowViewMoreClick }) => {
    return <GoogleMap
        defaultZoom={mapDisplayConfiguration.zoom}
        defaultCenter={mapDisplayConfiguration.center}
        onClick={() => onMapClick()}
    >
        {stations.map(station =>
            <Marker
                key={station.id}
                markerId={station.id}
                station={station}
                markerActive={markerActive}
                onMarkerClick={onMarkerClick}
                onInfoWindowCloseClick={onInfoWindowCloseClick}
                onInfoWindowViewMoreClick={onInfoWindowViewMoreClick}
            />
        )}
    </GoogleMap >
};

Map.defaultProps = {
    markerActive: null,
};

Map.prototype = {
    stations: arrayOf(stationType),
    markerActive: string,
    onMapClick: func.isRequired,
    onMarkerClick: func.isRequired,
    onInfoWindowCloseClick: func.isRequired,
    onInfoWindowViewMoreClick: func.isRequired,
};

export default Map;
