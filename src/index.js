/* eslint-disable no-eval */
/* eslint-disable no-new-func */
import { ClientFunction, Selector } from 'testcafe'
import { queries } from '@testing-library/dom'

const SELECTOR_TYPE = (Selector(new Function())()).constructor.name;



export async function configureOnce(options) {
  const { content } = configure(options);

  await new ClientFunction(new Function(content))();
}

export function configure(options) {

  const configFunction =
    `
  window.TestingLibraryDom.configure(${JSON.stringify(options)});
`;
  return { content: configFunction };
}
const withinSelectors = {};
Object.keys(queries).forEach(withinQueryName => {

  withinSelectors[withinQueryName] =
    new Function(`
    const els = arguments[0];
    if(els.length > 1) {
      throw new Error("within() only works with a single element, found " + els.length);
    }
    const el = els[0];
    const args = Array.from(arguments).slice(1);
    return window.TestingLibraryDom.within(el).${withinQueryName}.apply(null, args);
  `)

});

Object.keys(queries).forEach(queryName => {

  module.exports[queryName] = Selector(
    (...args) => window.TestingLibraryDom[queryName](document.body, ...args)
    , { dependencies: { queryName } });

})

export const within = sel => {
  if (sel instanceof Function) {
    return within(sel());
  }
  if (isSelector(sel)) {
    return (sel).addCustomMethods(withinSelectors, { returnDOMNodes: true })
  } else if (typeof (sel) === 'string') {
    return within(Selector(sel));
  } else {
    throw new Error(`"within" only accepts a query (getBy, queryBy, etc), string or testcafe Selector`)
  }
}

function isSelector(sel) {
  return sel.constructor.name === SELECTOR_TYPE;
}

