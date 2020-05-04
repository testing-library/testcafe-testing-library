import { ClientFunction, Selector } from "testcafe";
import { queries } from "@testing-library/dom";
import type {
  Options,
  TestcafeBoundFunction,
  TestcafeBoundFunctions,
} from "./types";

declare global {
  interface Window {
    TestingLibraryDom: typeof queries;
  }
}

const SELECTOR_TYPE = Selector("")().constructor.name;

const withinSelectors = Object.keys(queries).reduce((acc, withinQueryName) => {
  return {
    ...acc,
    [withinQueryName]: new Function(`
    const els = arguments[0];
    if(els.length > 1) {
      throw new Error("within() only works with a single element, found " + els.length);
    }
    const el = els[0];
    const args = Array.from(arguments).slice(1);
    return window.TestingLibraryDom.within(el).${withinQueryName}.apply(null, args);
  `),
  };
}, {} as Record<keyof typeof queries, (node: Element, ...methodParams: any[]) => any>);

export async function configureOnce(options: Partial<Options>) {
  const { content } = configure(options);
  // @ts-ignore
  await ClientFunction(new Function(content))();
}

export function configure(options: Partial<Options>) {
  const configFunction = `
  window.TestingLibraryDom.configure(${JSON.stringify(options)});
`;
  return { content: configFunction };
}

export function within<T>(
  sel: string | Selector | SelectorPromise | TestcafeBoundFunction<T>
): TestcafeBoundFunctions<typeof queries> {
  if (sel instanceof Function) {
    return within(sel());
  }
  if (isSelector(sel)) {
    // @ts-ignore
    return sel.addCustomMethods(withinSelectors, { returnDOMNodes: true });
  } else if (typeof sel === "string") {
    return within(Selector(sel));
  } else {
    throw new Error(
      `"within" only accepts a query (getBy, queryBy, etc), string or testcafe Selector`
    );
  }
}

function isSelector(sel: any): sel is Selector {
  return sel.constructor.name === SELECTOR_TYPE;
}

const bindFunction = <T extends keyof typeof queries>(queryName: T) => {
  const query = queryName.replace("find", "query") as T;
  return Selector(
    (matcher, ...options) => {
      return window.TestingLibraryDom[query](
        document.body,
        matcher,
        ...options
      ) as Node | Node[] | NodeList | HTMLCollection;
    },
    {
      dependencies: { query },
    }
  );
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

export * from "./types";
