import * as selectors from '../../src'

/* eslint-enable impoort/namespace */

test('exports expected selectors', () => {
  expect(selectors).toMatchObject(expect.any(Object))
  expect(Object.keys(selectors)).toMatchSnapshot()
  Object.keys(selectors).forEach(selector => {
    // eslint-disable-next-line import/namespace
    expect(selectors[selector]).toBeInstanceOf(Function)
  })
})
