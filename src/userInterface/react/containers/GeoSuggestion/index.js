import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMapStart } from 'application/state/flow/map/actions';

const GeoSuggestionTemplate = ({ onButtonClick }) => {
    return <div>
        <button onClick={() => onButtonClick({ latitude: 41.373, longitude: 2.17031, limit: 450.35 })}>
            Change location
    </button>
    </div>
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        onButtonClick: fetchMapStart,
    }, dispatch);

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps);

const GeoSuggestion = compose(
    withReduxConnect
)(GeoSuggestionTemplate);

export default GeoSuggestion;
