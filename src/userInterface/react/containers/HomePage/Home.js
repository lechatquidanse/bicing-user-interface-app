import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';

import { fetchMapStart } from 'application/state/flow/map/actions';
import { stationsWithLastAvailabilty } from 'application/state/flow/map/selectors';
import stationType from 'domain/types/stationType';
import MapEnhanced from 'userInterface/react/containers/Map';
import 'userInterface/react/components/App.css';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchMapStart();
  }

  render() {
    return (
      <div className="App">
        <MapEnhanced stations={this.props.stations} />
      </div>
    );
  }
}

Home.propTypes = {
  stations: arrayOf(stationType)
};

const mapStateToProps = state => ({
  stations: stationsWithLastAvailabilty(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchMapStart: fetchMapStart,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
