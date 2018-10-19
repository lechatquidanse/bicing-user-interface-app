import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'userInterface/react/components/App.css';
import Map from 'userInterface/react/components/Map';
import { fetchMapStart } from 'application/state/flow/map/actions';
import { stationsWithLastAvailabilty } from 'application/state/flow/map/selectors';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchMapStart();
  }

  render() {
    return (
      <div className="App">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          stations={this.props.stations}
        />
      </div>
    );
  }
}

Home.propTypes = {
  stations: PropTypes.array
};

const mapStateToProps = state => ({
  stations: stationsWithLastAvailabilty(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchMapStart: fetchMapStart,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
