import {
  actions as queryAvailabilitiesActions,
  selectors as queryAvailabilitiesSelectors,
} from 'application/state/query/availabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { DATE_TIME_FORMAT, FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { InputTimeSelector as InputTimeSelectorTemplate } from 'userInterface/react/components/InputDateTimeSelector';

const itineraryStep = 0;

const mapStateToProps = (state) => {
  const itineraryAt = queryAvailabilitiesSelectors.itineraryAtByItineraryStep(itineraryStep)(state);
  return {
    stationIds: queryStationsSelectors.stationIdsByItineraryStep(itineraryStep)(state),
    periodStart: queryAvailabilitiesSelectors.periodStartAtByItineraryStep(itineraryStep)(state),
    periodEnd: queryAvailabilitiesSelectors.periodEndAtByItineraryStep(itineraryStep)(state),
    interval: queryAvailabilitiesSelectors.intervalByItineraryStep(itineraryStep)(state),
    itineraryAt,
    itinerarySteps: queryAvailabilitiesSelectors.itinerarySteps(state),
    selected: moment(itineraryAt),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  queryAvailabilities: (
    step,
    itineraryAt,
    periodStart,
    periodEnd,
    interval,
    stationIds,
  ) => queryAvailabilitiesActions.fetchStart(
    step,
    itineraryAt,
    periodStart,
    periodEnd,
    interval,
    stationIds,
  ),
}, dispatch);

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onChange: (selectedOption) => {
    const previousItineraryAt = moment(propsFromState.itineraryAt);

    const newItineraryAt = moment(propsFromState.itineraryAt).set({
      year: previousItineraryAt.get('year'),
      month: previousItineraryAt.get('month'),
      date: previousItineraryAt.get('date'),
      hour: selectedOption.get('hour'),
      minute: selectedOption.get('minute'),
      second: selectedOption.get('second'),
    });
    // propsFromState.itinerarySteps.map(itineraryStep => {
    return propsFromDispatch.queryAvailabilities(
      itineraryStep,
      newItineraryAt.format(DATE_TIME_FORMAT),
      newItineraryAt.subtract(1, 'hour').format(FORMAT),
      newItineraryAt.add(1, 'hour').format(FORMAT),
      propsFromState.interval,
      propsFromState.stationIds,
    );
    // })
  },
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const InputTimeSelector = compose(
  withReduxConnect,
)(InputTimeSelectorTemplate);

export default InputTimeSelector;
