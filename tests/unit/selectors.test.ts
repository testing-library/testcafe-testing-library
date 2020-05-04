import * as selectors from '../../src'
import {queries} from '@testing-library/dom'

it('exports expected selectors', () => {
  expect(selectors).toMatchObject(expect.any(Object))
  expect(Object.keys(selectors)).toMatchSnapshot()
  Object.keys(selectors).forEach((selector) => {
    expect(selectors[selector as keyof typeof selectors]).toBeInstanceOf(
      Function,
    )
  })
})

it('exports all dom-testing-library queries', () => {
  let {configureOnce, configure, within, ...justSelectors} = selectors
  expect(Object.keys(justSelectors).sort()).toEqual(Object.keys(queries).sort())
})
