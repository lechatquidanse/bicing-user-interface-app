import * as selectors from 'application/state/command/toggleInfoWindow/selectors';
import { v4 as uuid } from 'uuid';
import StateBuilder from 'application/state/command/toggleInfoWindow/tests/support/StateBuilder';

describe('application/state/command/toggleInfoWindow/selectors', () => {
  test('it can return key', () => {
    const key = uuid();

    expect(selectors.key(StateBuilder.create().withKey(key).build())).toEqual(key);
  });
});
