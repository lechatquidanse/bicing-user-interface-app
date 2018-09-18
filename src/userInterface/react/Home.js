import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchStationListRequested } from "./../../application/state/module/map/actions";


class Home extends Component {
  componentDidMount() {
    this.props.fetchStationListRequested();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        <ul>{this.props.stations.map((station, i) => <li key={station.id}>{station.body} - {station.id}</li>)}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.map });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchStationListRequested: fetchStationListRequested }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
