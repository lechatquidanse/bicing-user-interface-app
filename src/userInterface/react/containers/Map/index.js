import React from 'react';
import { compose, withStateHandlers, withProps } from 'recompose';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

import Map from 'userInterface/react/components/Map';

const withMarkerClickBehaviour = withStateHandlers(
    { markerActive: null },
    {
        onMapClick: () => () => ({ markerActive: null }),
        onMarkerClick: () => (markerId) => ({ markerActive: markerId }),
        onInfoWindowCloseClick: () => () => ({ markerActive: null })
    }
);

const MapEnhanced = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withMarkerClickBehaviour
)(Map);

export default MapEnhanced;
