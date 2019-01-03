import { actions } from 'application/state/flow/map';
import React from 'react';
import { withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, lifecycle, withProps } from 'recompose';
import { bindActionCreators } from 'redux';

import 'userInterface/react/components/App.css';
import GeoLocation from 'userInterface/react/containers/GeoLocation';
import Map from 'userInterface/react/containers/Map';
import Station from 'userInterface/react/containers/Station';

const Home = () => (
  <div className="App">
    <GeoLocation />
    <Map />
    <Station />
  </div>
);
const mapDispatchToProps = dispatch => bindActionCreators({
  initMap: () => actions.flow(),
}, dispatch);

const withReduxConnect = connect(null, mapDispatchToProps);
const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.initMap();
  },
});

const withMapProps = withProps({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
});

export default compose(
  withMapProps,
  withScriptjs,
  withReduxConnect,
  withLifeCycle,
)(Home);
