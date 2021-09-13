/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable no-new-func */
import { ClientFunction, Selector } from "testcafe";
import { Matcher, queries } from "@testing-library/dom";
import type { Options, QueryName, WithinSelectors } from "./types";

declare global {
  interface Window {
    TestingLibraryDom: typeof queries;
  }
}

const SELECTOR_TYPE = Selector("")().constructor.name;

const queryNames = Object.keys(queries) as QueryName[];
const withinSelectors = queryNames.reduce((acc, withinQueryName) => {
  return {
    ...acc,
    [withinQueryName]: new Function(`
    const els = arguments[0];
    if(els.length > 1) {
      throw new Error("within() only works with a single element, found " + els.length);
    }
    const el = els[0];
    const args = Array.from(arguments).slice(1);
    return window.TestingLibraryDom.within(el).${withinQueryName.replace(
      "find",
      "query"
    )}.apply(null, args);
  `),
  };
  // eslint-disable-next-line
}, {} as Record<QueryName, (node: Element, ...methodParams: any[]) => any>);

export async function configureOnce(options: Partial<Options>) {
  const { content } = configure(options);
  await ClientFunction(new Function(content) as () => Function)();
}

export function configure(options: Partial<Options>) {
  const configFunction = `
  window.TestingLibraryDom.configure(${JSON.stringify(options)});
`;
  return { content: configFunction };
}

const withWithinMethods = (selector: Selector) => {
  return selector.addCustomMethods(withinSelectors, {
    returnDOMNodes: true,
  }) as unknown as WithinSelectors;
};
type SelectorArg =
  | string
  | Selector
  | SelectorPromise
  | (() => SelectorPromise);

export function within(selector: SelectorArg): WithinSelectors {
  if (selector instanceof Function) {
    return within(selector());
  }

  if (isSelector(selector)) {
    return withWithinMethods(selector);
  } else if (typeof selector === "string") {
    return within(Selector(selector));
  } else {
    throw new Error(
      `"within" only accepts a query (getBy, queryBy, etc), string or testcafe Selector`
    );
  }
}

function isSelector(sel: SelectorArg): sel is Selector {
  return sel.constructor.name === SELECTOR_TYPE;
}

const bindFunction = <
  T extends QueryName,
  Options = Parameters<typeof queries[T]>[2]
>(
  queryName: T
) => {
  const query = queryName.replace("find", "query") as T;
  return (matcher: Matcher, options?: Options) => {
    return Selector(
      () =>
        window.TestingLibraryDom[query](document.body, matcher, options) as
          | Node
          | Node[]
          | NodeList
          | HTMLCollection,
      {
        dependencies: { query, matcher, options },
      }
    );
  };
};

export const getByLabelText = bindFunction("getByLabelText");
export const getAllByLabelText = bindFunction("getAllByLabelText");
export const queryByLabelText = bindFunction("queryByLabelText");
export const queryAllByLabelText = bindFunction("queryAllByLabelText");
export const findByLabelText = bindFunction("findByLabelText");
export const findAllByLabelText = bindFunction("findAllByLabelText");
export const getByPlaceholderText = bindFunction("getByPlaceholderText");
export const getAllByPlaceholderText = bindFunction("getAllByPlaceholderText");
export const queryByPlaceholderText = bindFunction("queryByPlaceholderText");
export const queryAllByPlaceholderText = bindFunction(
  "queryAllByPlaceholderText"
);
export const findByPlaceholderText = bindFunction("findByPlaceholderText");
export const findAllByPlaceholderText = bindFunction(
  "findAllByPlaceholderText"
);
export const getByText = bindFunction("getByText");
export const getAllByText = bindFunction("getAllByText");
export const queryByText = bindFunction("queryByText");
export const queryAllByText = bindFunction("queryAllByText");
export const findByText = bindFunction("findByText");
export const findAllByText = bindFunction("findAllByText");
export const getByAltText = bindFunction("getByAltText");
export const getAllByAltText = bindFunction("getAllByAltText");
export const queryByAltText = bindFunction("queryByAltText");
export const queryAllByAltText = bindFunction("queryAllByAltText");
export const findByAltText = bindFunction("findByAltText");
export const findAllByAltText = bindFunction("findAllByAltText");
export const getByTitle = bindFunction("getByTitle");
export const getAllByTitle = bindFunction("getAllByTitle");
export const queryByTitle = bindFunction("queryByTitle");
export const queryAllByTitle = bindFunction("queryAllByTitle");
export const findByTitle = bindFunction("findByTitle");
export const findAllByTitle = bindFunction("findAllByTitle");
export const getByDisplayValue = bindFunction("getByDisplayValue");
export const getAllByDisplayValue = bindFunction("getAllByDisplayValue");
export const queryByDisplayValue = bindFunction("queryByDisplayValue");
export const queryAllByDisplayValue = bindFunction("queryAllByDisplayValue");
export const findByDisplayValue = bindFunction("findByDisplayValue");
export const getByRole = bindFunction("getByRole");
export const getAllByRole = bindFunction("getAllByRole");
export const queryByRole = bindFunction("queryByRole");
export const queryAllByRole = bindFunction("queryAllByRole");
export const findByRole = bindFunction("findByRole");
export const findAllByRole = bindFunction("findAllByRole");
export const findAllByDisplayValue = bindFunction("findAllByDisplayValue");
export const getByTestId = bindFunction("getByTestId");
export const getAllByTestId = bindFunction("getAllByTestId");
export const queryByTestId = bindFunction("queryByTestId");
export const queryAllByTestId = bindFunction("queryAllByTestId");
export const findByTestId = bindFunction("findByTestId");
export const findAllByTestId = bindFunction("findAllByTestId");

export const screen = {
  getByLabelText,
  getAllByLabelText,
  queryByLabelText,
  queryAllByLabelText,
  findByLabelText,
  findAllByLabelText,
  getByText,
  getAllByText,
  queryByText,
  queryAllByText,
  findByText,
  findAllByText,
  getByAltText,
  getByPlaceholderText,
  getAllByPlaceholderText,
  queryByPlaceholderText,
  queryAllByPlaceholderText,
  findByPlaceholderText,
  findAllByPlaceholderText,
  getAllByAltText,
  queryByAltText,
  queryAllByAltText,
  findByAltText,
  findAllByAltText,
  getByTitle,
  getAllByTitle,
  queryByTitle,
  queryAllByTitle,
  findByTitle,
  findAllByTitle,
  getByDisplayValue,
  getAllByDisplayValue,
  queryByDisplayValue,
  queryAllByDisplayValue,
  findByDisplayValue,
  getByRole,
  getAllByRole,
  queryByRole,
  queryAllByRole,
  findByRole,
  findAllByRole,
  findAllByDisplayValue,
  getByTestId,
  getAllByTestId,
  queryByTestId,
  queryAllByTestId,
  findByTestId,
  findAllByTestId,
};

export * from "./types";
