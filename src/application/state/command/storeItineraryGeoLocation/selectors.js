/* eslint-disable */
import ByItineraryGeoLocationFilter from 'application/state/filter/ByItineraryGeoLocationFilter';
import AppError from 'domain/errors/AppError';

const selector = state => state.command.storeItineraryGeoLocation.itinerarySteps;

const step = (itineraryStep, state) => selector(state).find(step => step.itineraryStep === itineraryStep);

const data = (itineraryStep, state) => (step(itineraryStep, state) === undefined ?
  undefined :
  step(itineraryStep, state).data);

const filter = (itineraryStep, state) => (data(itineraryStep, state) !== undefined && data(itineraryStep, state) instanceof ByItineraryGeoLocationFilter
  ? data(itineraryStep, state) : undefined);

export const isErrorByItineraryStep = itineraryStep => state => (step(itineraryStep, state) === undefined ? false : step(itineraryStep, state).error);

export const errorByItineraryStep = itineraryStep => state => (isErrorByItineraryStep(itineraryStep)(state) === true
  && data(itineraryStep, state) instanceof AppError
  ? data(itineraryStep, state).publicMessage : undefined);

export const latitudeByItineraryStep = itineraryStep => state => (filter(itineraryStep, state) === undefined
  ? undefined
  : filter(itineraryStep, state).latitude);

export const longitudeByItineraryStep = itineraryStep => state => (filter(itineraryStep, state) === undefined ? undefined : filter(itineraryStep, state).longitude);

export const limitByItineraryStep = itineraryStep => state => (filter(itineraryStep, state) === undefined ? undefined : filter(itineraryStep, state).limit);

// @todo add test
export const zoomByItineraryStep = itineraryStep => state => (filter(itineraryStep, state) === undefined ? undefined : filter(itineraryStep, state).zoom());
