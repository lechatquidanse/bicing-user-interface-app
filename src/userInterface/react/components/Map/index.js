import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(props => {
    const markers = props.stations.map(station => {
        let icon = ('BIKE' === station.type) ?
            'https://mt.googleapis.com/vt/icon/name=icons/spotlight/spotlight-poi.png' :
            'https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-blue.png';

        return (
            <Marker
                // animation={window.google.maps.Animation.DROP}
                defaultIcon={icon}
                key={station.id}
                position={{ lat: station.latitude, lng: station.longitude }}
            // options={{ optimized: false }} use for e2e test to see marker in DOM
            >
            </Marker>
        )
    });

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 41.390205, lng: 2.154007 }}
        // options={{ optimized: false }} use for e2e test to see marker in DOM
        >
            {markers}
        </GoogleMap >
    )
}));

export default Map;
