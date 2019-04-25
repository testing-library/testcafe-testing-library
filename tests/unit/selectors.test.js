import { Selector } from 'testcafe';
import * as selectors from '../../src';

test('exports expected selectors', () => {
  expect(selectors).toMatchObject(expect.any(Object));
  expect(Object.keys(selectors)).toMatchSnapshot();
  Object.keys(selectors).forEach(selector => {
    expect(selectors[selector]).toBeInstanceOf(Function);
  });
});
