import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import 'userInterface/react/components/App.css';
import ItinerarySearch from 'userInterface/react/containers/ItinerarySearch';
import Map from 'userInterface/react/containers/Map';
import { actions as flowMapActions } from 'application/state/flow/map';

const Home = () => (
  <div className="App">
    <ItinerarySearch />
    <Map />
    {/* <Station /> */}
  </div>
);

export const mapDispatchToProps = dispatch => bindActionCreators({
  initMap: () => flowMapActions.flow(),
}, dispatch);

const withReduxConnect = connect(null, mapDispatchToProps);

const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.initMap();
  },
});

export default compose(
  withReduxConnect,
  withLifeCycle,
)(Home);
