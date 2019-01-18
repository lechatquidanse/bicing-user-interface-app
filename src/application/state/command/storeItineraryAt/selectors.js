import ByItineraryAtFilter from 'application/state/filter/ByItineraryAtFilter';
import AppError from 'domain/errors/AppError';

const selector = state => state.command.storeItineraryAt;
const data = state => selector(state).data;
const filter = state => (data(state) !== undefined && data(state) instanceof ByItineraryAtFilter
  ? data(state) : undefined);

export const isError = state => selector(state).error;

export const error = state => (isError(state) === true && data(state) instanceof AppError
  ? data(state).publicMessage : undefined);

export const itineraryAt = state => (filter(state) === undefined
  ? undefined : filter(state).itineraryAt);

export const periodStartAt = state => (filter(state) === undefined
  ? undefined : filter(state).periodStartAt);

export const periodEndAt = state => (filter(state) === undefined
  ? undefined : filter(state).periodEndAt);

export const interval = state => (filter(state) === undefined
  ? undefined : filter(state).interval);
