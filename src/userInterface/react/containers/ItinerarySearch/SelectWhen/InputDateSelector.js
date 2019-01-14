import {
  actions as queryAvailabilitiesActions,
  selectors as queryAvailabilitiesSelectors,
} from 'application/state/query/availabilities';
import { selectors as queryStationsSelectors } from 'application/state/query/stations';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'domain/definitions/byIntervalInPeriodDefinition';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { InputDateSelector as InputDateSelectorTemplate } from 'userInterface/react/components/InputDateTimeSelector';

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
    option: moment(itineraryAt).format(DATE_FORMAT),
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
  onOptionChange: (selectedOption) => {
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

    // propsFromState.itinerarySteps.map(itineraryStep => {
    return propsFromDispatch.queryAvailabilities(
      itineraryStep,
      newItineraryAt.format(DATE_TIME_FORMAT),
      newItineraryAt.subtract(1, 'hour').format(DATE_TIME_FORMAT),
      newItineraryAt.add(1, 'hour').format(DATE_TIME_FORMAT),
      propsFromState.interval,
      propsFromState.stationIds,
    );
    // })
  },
});

const withReduxConnect = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const InputDateSelector = compose(
  withReduxConnect,
)(InputDateSelectorTemplate);

export default InputDateSelector;
