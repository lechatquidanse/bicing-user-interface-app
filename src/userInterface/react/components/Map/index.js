import React from 'react';
import { GoogleMap } from 'react-google-maps';
import { arrayOf, string, func } from 'prop-types';

import stationType from 'domain/types/stationType';
import Marker from 'userInterface/react/components/Marker';

const Map = ({ stations, markerActive, onMapClick, onMarkerClick, onInfoWindowCloseClick }) => {
    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
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
};

export default Map;
