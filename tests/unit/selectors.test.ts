import * as selectors from '../../src'

it('exports expected selectors', () => {
  expect(selectors).toMatchObject(expect.any(Object))
  expect(Object.keys(selectors)).toMatchSnapshot()
  Object.keys(selectors).forEach((selector) => {
    expect(selectors[selector as keyof typeof selectors]).toBeInstanceOf(
      Function,
    )
  })
})
