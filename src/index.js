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


Object.keys(queries).forEach(queryName => {
  module.exports[queryName] = Selector(
    (...args) => window.TestingLibraryDom[queryName](document.body, ...args)
    , { dependencies: { queryName } })

})
function reviver(key, value) {
  if (value.toString().indexOf('__REGEXP ') == 0) {
    const m = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
    return new RegExp(m[1], m[2] || '');
  } else
    return value;
}

export const within = async sel => {
  // if (sel instanceof Function) {
  //   return within(sel());
  // }

  if (sel.constructor.name === SELECTOR_TYPE) {
    // const count = await sel.count;
    // if (count > 1) {
    //   throw new Error(`within() requires a single element, found ${count}`);
    // }

    // const withinSelectors = {};
    // Object.keys(queries).forEach(queryName => {
    //   withinSelectors[queryName] = (el, ...args) => {
    //     return window.TestingLibraryDom.within(el)[queryName](...args);
    //   };
    //   // TODO, find a way to inject queryNames dynamically
    //   // I would like to use the above, but i'm willing to use the eval below if need be.  Wasn't sure if 
    //   // there's a way to pass `{dependencies}` to a customMethod.
    //   //
    //   // withinSelectors[queryName] = new Function(`
    //   //   const [el, ...args] = arguments;
    //   //   return window.TestingLibraryDom.within(el).${queryName}(...args);
    //   // `)
    // });
    // withinSelector.addCustomMethods({ ...withinSelectors }, { returnDOMNodes: true });

    return Selector(
      () => {
        return sel();
      }, { dependencies: { sel } })
      .addCustomMethods({
        getByText: (el, ...args) => {
          return window.TestingLibraryDom.within(el).getByText(...args);
        }
      }, { returnDOMNodes: true });

  } else if (typeof (sel) === 'string') {
    const withinSelectors = {};

    Object.keys(queries).forEach(queryName => {
      withinSelectors[queryName] = Selector((...args) => {
        // eslint-disable-next-line no-shadow
        const { within } = window.TestingLibraryDom;
        return within(document.querySelector(sel))[queryName](...args);
      }, { dependencies: { queryName, sel } }
      )
    })

    return withinSelectors;
  } else {
    throw new Error(`"within" only accepts a string or another testing-library query as a parameter. ${sel} is not one of those`)
  }
}

