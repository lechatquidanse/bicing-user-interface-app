import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(prop => {
    const markers = prop.stations.map(station => {
        let icon = ('BIKE' === station.type) ?
            'https://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png' :
            'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png';

        return (
            <Marker
                defaultIcon={icon}
                key={station.id}
                position={{ lat: station.latitude, lng: station.longitude }}
            >
            </Marker>
        )
    });

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
        >
            {markers}
        </GoogleMap >
    )
}));

export default Map;
