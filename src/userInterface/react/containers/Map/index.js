import React from 'react';
import { compose, lifecycle, withStateHandlers, withProps } from 'recompose';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {

    Loading as LoadingTemplate,
    Empty as EmptyTemplate,
    Map as MapTemplate
} from 'userInterface/react/components/Map';

import { fetchMapStart } from 'application/state/flow/map/actions';
import { stationsWithLastAvailabiltySelector } from 'application/state/flow/map/selectors';
import { isFetchingSelector as isFetchingStationsSelector } from 'application/state/query/stations/selectors';
import { fetchStationStart } from 'application/state/flow/station/actions';
import { withMaybe, withEither } from 'userInterface/react/renderers';

const isLoadingStations = (props) => props.isFetchingStations;
const isNullStations = (props) => !props.stations;
const isEmptyStations = (props) => props.stations.length === 0;

const withMapProps = withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
});

const mapStateToProps = state => ({
    stations: stationsWithLastAvailabiltySelector(state),
    isFetchingStations: isFetchingStationsSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        fetchMapStart: fetchMapStart,
        onInfoWindowViewMoreClick: fetchStationStart,
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

const Map = compose(
    withMapProps,
    withScriptjs,
    withGoogleMap,
    withReduxConnect,
    withLifeCycle,
    withMarkerClickBehaviour,
    withEither(isLoadingStations, LoadingTemplate),
    withMaybe(isNullStations),
    withEither(isEmptyStations, EmptyTemplate)
)(MapTemplate);

export default Map;
