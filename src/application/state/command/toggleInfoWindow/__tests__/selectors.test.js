import * as selectors from 'application/state/command/toggleInfoWindow/selectors';
import { v4 as uuid } from 'uuid';

describe('application/state/command/toggleInfoWindow/selectors', () => {
  test('it can return key', () => {
    const key = uuid();
    const state = { command: { toggleInfoWindow: { key } } };

    expect(selectors.key(state)).toEqual(key);
  });
});
