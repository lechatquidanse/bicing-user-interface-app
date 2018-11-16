import { compose } from 'recompose';
import { connect } from 'react-redux';

import { dataSelector } from 'application/state/query/station/selectors';
import { default as StationDetailsTemplate } from 'userInterface/react/components/StationDetails';
import { withMaybe } from 'userInterface/react/renderers';

const isNullStation = (props) => !props.station;

const mapStateToProps = state => ({
    station: dataSelector(state),
});

const withReduxConnect = connect(mapStateToProps);

const StationDetails = compose(
    withReduxConnect,
    withMaybe(isNullStation),
)(StationDetailsTemplate);

export default StationDetails;
