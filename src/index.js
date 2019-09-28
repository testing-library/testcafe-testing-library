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

  const withinSelectors = {};
  Object.keys(queries).forEach(withinQueryName => {

    withinSelectors[withinQueryName] =
      new Function(`
      const el = arguments[0][0];
      const args = Array.from(arguments).slice(1);
      return window.TestingLibraryDom.within(el).${withinQueryName}.apply(null, args);
    `)

  });

  module.exports[queryName] = Selector(
    (...args) => window.TestingLibraryDom[queryName](document.body, ...args)
    , { dependencies: { queryName } })
    .addCustomMethods(withinSelectors, { returnDOMNodes: true });

})

export const within = sel => {
  // if (sel instanceof Function) {
  //   return within(sel());
  // }
  if (sel.getByText) { //sel.constructor.name === SELECTOR_TYPE) {
    // const count = await sel.count;
    // if (count > 1) {
    //   throw new Error(`within() requires a single element, found ${count}`);
    // }

    return sel;
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

    // const w = await Selector(
    //   () => {
    //     return sel();
    //   }, { dependencies: { sel } });



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

