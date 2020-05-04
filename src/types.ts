import {Config, BoundFunction} from '@testing-library/dom'

export type Options = Pick<Config, 'testIdAttribute'>

export type TestcafeBoundFunction<T> = (
  ...params: Parameters<BoundFunction<T>>
) => SelectorPromise

export type TestcafeBoundFunctions<T> = {
  [P in keyof T]: TestcafeBoundFunction<T[P]>
}
