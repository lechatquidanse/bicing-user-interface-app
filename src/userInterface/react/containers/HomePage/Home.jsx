import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import 'userInterface/react/components/App.css';
import ItinerarySearch from 'userInterface/react/containers/ItinerarySearch';
import Map from 'userInterface/react/containers/Map';
import { mapDispatchToProps, mapStateToProps } from 'userInterface/react/containers/Map/mapProps';

const Home = () => (
  <div className="App">
    <ItinerarySearch />
    <Map />
    {/* <Station /> */}
  </div>
);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  initMap: () => {
    propsFromDispatch.flowMap(
      propsFromState.itineraryStep,
      propsFromState.itineraryAt,
      propsFromState.periodStartAt,
      propsFromState.periodEndAt,
      propsFromState.interval,
      propsFromState.latitude,
      propsFromState.longitude,
      propsFromState.limit,
    );
  },
});

const itineraryStep = 0;

const withReduxConnect = connect(mapStateToProps(itineraryStep), mapDispatchToProps, mergeProps);

const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.initMap();
  },
});

export default compose(
  withReduxConnect,
  withLifeCycle,
)(Home);
