import { selectors as commandConfigureMapSelectors } from 'application/state/command/configureMap';
import { actions as flowMapActions } from 'application/state/flow/map';
import { selectors as queryAvailabilitiesSelectors } from 'application/state/query/availabilities';
import { bindActionCreators } from 'redux';

export const mapStateToProps = itineraryStep => (state, props) => {
  const step = props.itineraryStep === undefined ? itineraryStep : props.itineraryStep;

  return {
    itineraryStep: step,
    itineraryAt: queryAvailabilitiesSelectors.itineraryAtByItineraryStep(step)(state),
    periodStartAt: queryAvailabilitiesSelectors.periodStartAtByItineraryStep(step)(state),
    periodEndAt: queryAvailabilitiesSelectors.periodEndAtByItineraryStep(step)(state),
    interval: queryAvailabilitiesSelectors.intervalByItineraryStep(step)(state),
    latitude: commandConfigureMapSelectors.latitude(state),
    longitude: commandConfigureMapSelectors.longitude(state),
    limit: commandConfigureMapSelectors.limit(state),
  };
};


export const mapDispatchToProps = dispatch => bindActionCreators({
  flowMap: (
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  ) => flowMapActions.flow(
    itineraryStep,
    itineraryAt,
    periodStartAt,
    periodEndAt,
    interval,
    latitude,
    longitude,
    limit,
  ),
}, dispatch);
