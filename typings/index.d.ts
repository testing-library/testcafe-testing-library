import { BoundFunction, IConfig, queries } from '@testing-library/dom';
import { Selector, t, ClientScript } from 'testcafe';

export function configureOnce(
    options: Pick<IConfig, 'testIdAttribute'>
): Promise<void>

export function configure(
    options: Pick<IConfig, 'testIdAttribute'>
): ClientScript;

export type TestcafeBoundFunction<T> = (...params: Parameters<BoundFunction<T>>) => Selector;
export type TestcafeBoundFunctions<T> = { [P in keyof T]: TestcafeBoundFunction<T[P]> };

export function within(selector: string | TestcafeBoundFunction): Promise<TestcafeBoundFunctions<typeof queries>>;

export const getByLabelText: TestcafeBoundFunction<typeof queries.getByLabelText>;
export const getAllByLabelText: TestcafeBoundFunction<typeof queries.getAllByLabelText>;
export const queryByLabelText: TestcafeBoundFunction<typeof queries.queryByLabelText>;
export const queryAllByLabelText: TestcafeBoundFunction<typeof queries.queryAllByLabelText>;
export const findByLabelText: TestcafeBoundFunction<typeof queries.findByLabelText>;
export const findAllByLabelText: TestcafeBoundFunction<typeof queries.findAllByLabelText>;
export const getByPlaceholderText: TestcafeBoundFunction<typeof queries.getByPlaceholderText>;
export const getAllByPlaceholderText: TestcafeBoundFunction<typeof queries.getAllByPlaceholderText>;
export const queryByPlaceholderText: TestcafeBoundFunction<typeof queries.queryByPlaceholderText>;
export const queryAllByPlaceholderText: TestcafeBoundFunction<typeof queries.queryAllByPlaceholderText>;
export const findByPlaceholderText: TestcafeBoundFunction<typeof queries.findByPlaceholderText>;
export const findAllByPlaceholderText: TestcafeBoundFunction<typeof queries.findAllByPlaceholderText>;
export const getByText: TestcafeBoundFunction<typeof queries.getByText>;
export const getAllByText: TestcafeBoundFunction<typeof queries.getAllByText>;
export const queryByText: TestcafeBoundFunction<typeof queries.queryByText>;
export const queryAllByText: TestcafeBoundFunction<typeof queries.queryAllByText>;
export const findByText: TestcafeBoundFunction<typeof queries.findByText>;
export const findAllByText: TestcafeBoundFunction<typeof queries.findAllByText>;
export const getByAltText: TestcafeBoundFunction<typeof queries.getByAltText>;
export const getAllByAltText: TestcafeBoundFunction<typeof queries.getAllByAltText>;
export const queryByAltText: TestcafeBoundFunction<typeof queries.queryByAltText>;
export const queryAllByAltText: TestcafeBoundFunction<typeof queries.queryAllByAltText>;
export const findByAltText: TestcafeBoundFunction<typeof queries.findByAltText>;
export const findAllByAltText: TestcafeBoundFunction<typeof queries.findAllByAltText>;
export const getByTitle: TestcafeBoundFunction<typeof queries.getByTitle>;
export const getAllByTitle: TestcafeBoundFunction<typeof queries.getAllByTitle>;
export const queryByTitle: TestcafeBoundFunction<typeof queries.queryByTitle>;
export const queryAllByTitle: TestcafeBoundFunction<typeof queries.queryAllByTitle>;
export const findByTitle: TestcafeBoundFunction<typeof queries.findByTitle>;
export const findAllByTitle: TestcafeBoundFunction<typeof queries.findAllByTitle>;
export const getByDisplayValue: TestcafeBoundFunction<typeof queries.getByDisplayValue>;
export const getAllByDisplayValue: TestcafeBoundFunction<typeof queries.getAllByDisplayValue>;
export const queryByDisplayValue: TestcafeBoundFunction<typeof queries.queryByDisplayValue>;
export const queryAllByDisplayValue: TestcafeBoundFunction<typeof queries.queryAllByDisplayValue>;
export const findByDisplayValue: TestcafeBoundFunction<typeof queries.findByDisplayValue>;
export const findAllByDisplayValue: TestcafeBoundFunction<typeof queries.findAllByDisplayValue>;
export const getByRole: TestcafeBoundFunction<typeof queries.getByRole>;
export const getAllByRole: TestcafeBoundFunction<typeof queries.getAllByRole>;
export const queryByRole: TestcafeBoundFunction<typeof queries.queryByRole>;
export const queryAllByRole: TestcafeBoundFunction<typeof queries.queryAllByRole>;
export const findByRole: TestcafeBoundFunction<typeof queries.findByRole>;
export const findAllByRole: TestcafeBoundFunction<typeof queries.findAllByRole>;
export const getByTestId: TestcafeBoundFunction<typeof queries.getByTestId>;
export const getAllByTestId: TestcafeBoundFunction<typeof queries.getAllByTestId>;
export const queryByTestId: TestcafeBoundFunction<typeof queries.queryByTestId>;
export const queryAllByTestId: TestcafeBoundFunction<typeof queries.queryAllByTestId>;
export const findByTestId: TestcafeBoundFunction<typeof queries.findByTestId>;
export const findAllByTestId: TestcafeBoundFunction<typeof queries.findAllByTestId>;
