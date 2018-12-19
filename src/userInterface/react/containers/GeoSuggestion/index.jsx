/* eslint-disable */
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'application/state/flow/map';

const GeoSuggestionTemplate = ({ onButtonClick }) => (
  <div>
    <button onClick={() => onButtonClick({ latitude: 41.373, longitude: 2.17031, limit: 450.35 })}>
            Change location
    </button>
  </div>
);

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onButtonClick: actions.flowStart,
}, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const GeoSuggestion = compose(
  withReduxConnect,
)(GeoSuggestionTemplate);

export default GeoSuggestion;
