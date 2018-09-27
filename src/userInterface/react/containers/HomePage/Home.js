import React, { Component } from 'react';
import './../../components/App.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchMapStart } from "./../../../../application/state/flow/map/actions";
import Map from '../../components/Map';

class Home extends Component {
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
          stations={this.props.stationsWithLastAvailabilities}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.flow.map,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    fetchMapStart: fetchMapStart,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
