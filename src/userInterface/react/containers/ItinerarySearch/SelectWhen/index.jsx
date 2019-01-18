import {
  actions as commandStoreItineraryAtActions,
  selectors as commandStoreItineraryAtSelectors,
} from 'application/state/command/storeItineraryAt';
import { DATE_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import InputDateTimeSelectorTemplate from 'userInterface/react/components/InputDateTimeSelector';

const mapStateToProps = (state) => {
  const itineraryAt = commandStoreItineraryAtSelectors.itineraryAt(state);

  return {
    itineraryAt,
    dateSelected: moment(itineraryAt).format(DATE_FORMAT),
    timeSelected: moment(itineraryAt),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  storeItineraryAt: itineraryAt => commandStoreItineraryAtActions.storeStart(itineraryAt),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onDateChange: (selectedOption) => {
    const dateItineraryAt = moment(selectedOption.value);
    const previousItineraryAt = moment(propsFromState.itineraryAt);

    const newItineraryAt = moment().set({
      year: dateItineraryAt.get('year'),
      month: dateItineraryAt.get('month'),
      date: dateItineraryAt.get('date'),
      hour: previousItineraryAt.get('hour'),
      minute: previousItineraryAt.get('minute'),
      second: previousItineraryAt.get('second'),
    });

    return propsFromDispatch.storeItineraryAt(newItineraryAt);
  },
  onTimeChange: (selectedOption) => {
    const previousItineraryAt = moment(propsFromState.itineraryAt);

    const newItineraryAt = moment().set({
      year: previousItineraryAt.get('year'),
      month: previousItineraryAt.get('month'),
      date: previousItineraryAt.get('date'),
      hour: selectedOption.get('hour'),
      minute: selectedOption.get('minute'),
      second: selectedOption.get('second'),
    });

    return propsFromDispatch.storeItineraryAt(newItineraryAt);
  },
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const InputDateTimeSelector = compose(
  withReduxConnect,
)(InputDateTimeSelectorTemplate);

export default InputDateTimeSelector;
