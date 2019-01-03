import { FLOW } from 'application/state/flow/station/types';
import {
  DEFAULT_INTERVAL,
  DEFAULT_PERIOD_END,
  DEFAULT_PERIOD_START,
} from 'domain/definitions/byIntervalInPeriodDefinition';

export const flow = (
  stationId,
  periodStart = DEFAULT_PERIOD_START,
  periodEnd = DEFAULT_PERIOD_END,
  interval = DEFAULT_INTERVAL,
) => ({
  payload: {
    stationId, periodStart, periodEnd, interval,
  },
  type: FLOW.START,
});

export default flow;
