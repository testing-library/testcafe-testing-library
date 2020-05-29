import { Config, BoundFunction, queries} from "@testing-library/dom";

export type Options = Pick<Config, "testIdAttribute">;

export type TestcafeBoundFunction<T> = (
  ...params: Parameters<BoundFunction<T>>
) => SelectorPromise;

export type TestcafeBoundFunctions<T> = {
  [P in keyof T]: TestcafeBoundFunction<T[P]>;
};

export type Screen = {
  getByText: TestcafeBoundFunction<keyof typeof queries>,
getAllByText: TestcafeBoundFunction<keyof typeof queries>,
queryByText: TestcafeBoundFunction<keyof typeof queries>,
queryAllByText: TestcafeBoundFunction<keyof typeof queries>,
findByText: TestcafeBoundFunction<keyof typeof queries>,
findAllByText: TestcafeBoundFunction<keyof typeof queries>,
getByAltText: TestcafeBoundFunction<keyof typeof queries>,
getAllByAltText: TestcafeBoundFunction<keyof typeof queries>,
queryByAltText: TestcafeBoundFunction<keyof typeof queries>,
queryAllByAltText: TestcafeBoundFunction<keyof typeof queries>,
findByAltText: TestcafeBoundFunction<keyof typeof queries>,
findAllByAltText: TestcafeBoundFunction<keyof typeof queries>,
getByTitle: TestcafeBoundFunction<keyof typeof queries>,
getAllByTitle: TestcafeBoundFunction<keyof typeof queries>,
queryByTitle: TestcafeBoundFunction<keyof typeof queries>,
queryAllByTitle: TestcafeBoundFunction<keyof typeof queries>,
findByTitle: TestcafeBoundFunction<keyof typeof queries>,
findAllByTitle: TestcafeBoundFunction<keyof typeof queries>,
getByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
getAllByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
queryByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
queryAllByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
findByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
getByRole: TestcafeBoundFunction<keyof typeof queries>,
getAllByRole: TestcafeBoundFunction<keyof typeof queries>,
queryByRole: TestcafeBoundFunction<keyof typeof queries>,
queryAllByRole: TestcafeBoundFunction<keyof typeof queries>,
findByRole: TestcafeBoundFunction<keyof typeof queries>,
findAllByRole: TestcafeBoundFunction<keyof typeof queries>,
findAllByDisplayValue: TestcafeBoundFunction<keyof typeof queries>,
getByTestId: TestcafeBoundFunction<keyof typeof queries>,
getAllByTestId: TestcafeBoundFunction<keyof typeof queries>,
queryByTestId: TestcafeBoundFunction<keyof typeof queries>,
queryAllByTestId: TestcafeBoundFunction<keyof typeof queries>,
findByTestId: TestcafeBoundFunction<keyof typeof queries>,
findAllByTestId: TestcafeBoundFunction<keyof typeof queries>,
}
