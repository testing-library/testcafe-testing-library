import { Config, BoundFunction, queries } from "@testing-library/dom";

export type Options = Pick<Config, "testIdAttribute">;

export type TestcafeBoundFunction<T> = (
  ...params: Parameters<BoundFunction<T>>
) => SelectorPromise;

export type TestcafeBoundFunctions<T> = {
  [P in keyof T]: TestcafeBoundFunction<T[P]>;
};

export type QueryName = keyof typeof queries;

export type WithinSelectors = TestcafeBoundFunctions<typeof queries>;
