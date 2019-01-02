import { actions } from 'application/state/flow/map';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LIMIT,
  DEFAULT_LONGITUDE,
} from 'domain/definitions/configurationMapDefinition';
import React from 'react';
import { withScriptjs } from 'react-google-maps';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { bindActionCreators } from 'redux';
import { GeoSuggestion as GeoSuggestionTemplate } from 'userInterface/react/components/GeoLocation';

const mapDispatchToProps = dispatch => bindActionCreators({
  onSuggestSelect: (suggest) => {
    if (suggest === undefined) {
      return actions.flow(DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_LIMIT);
    }

    return actions.flow(suggest.location.lat, suggest.location.lng, 900);
  },
}, dispatch);

const withReduxConnect = connect(null, mapDispatchToProps);

const withMapProps = withProps({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
  loadingElement: <div style={{ height: '100%' }} />,
});

const GeoSuggestion = compose(
  withMapProps,
  withScriptjs,
  withReduxConnect,
)(GeoSuggestionTemplate);

export default GeoSuggestion;
