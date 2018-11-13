import React from 'react';
import { compose, lifecycle, withStateHandlers, withProps } from 'recompose';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Map from 'userInterface/react/components/Map';
import { fetchMapStart } from 'application/state/flow/map/actions';
import { stationsWithLastAvailabilty } from 'application/state/flow/map/selectors';
import { fetchStart } from 'application/state/query/stationAvailabilities/actions';
import { stationAvailabilitiesDataList } from 'application/state/query/stationAvailabilities/selectors';

const withMapProps = withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
});

const mapStateToProps = state => ({
    stations: stationsWithLastAvailabilty(state),
    stationAvailabilities: stationAvailabilitiesDataList(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchMapStart: fetchMapStart,
        onInfoWindowViewMoreClick: fetchStart,
    }, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const withLifeCycle = lifecycle({
    componentDidMount() {
        this.props.fetchMapStart();
    }
});

const withMarkerClickBehaviour = withStateHandlers(
    { markerActive: null },
    {
        onMapClick: () => () => ({ markerActive: null }),
        onMarkerClick: () => (markerId) => ({ markerActive: markerId }),
        onInfoWindowCloseClick: () => () => ({ markerActive: null }),
    }
);

const MapEnhanced = compose(
    withMapProps,
    withScriptjs,
    withGoogleMap,
    withReduxConnect,
    withLifeCycle,
    withMarkerClickBehaviour,
)(Map);

export default MapEnhanced;
