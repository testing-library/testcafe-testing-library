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
  const sel = Selector(
    new Function(
      `
      const el = TestingLibraryDom.${queryName}(document.body, ...arguments);
      if(!Array.isArray(el)) {
        el.setAttribute('data-tctl-args', JSON.stringify(Array.from(arguments)));
        el.setAttribute('data-tctl-queryname', '${queryName}');  
      }
      return el;
      `,
    ),
  );
  sel.addCustomDOMProperties({
    queryName: () => `${queryName}`,
    tctlArgs: (el) => el.getAttribute('data-tctl-args')
  })
  module.exports[queryName] = sel;
})

export const within = async selector => {
  if (selector.constructor.name === SELECTOR_TYPE) {

    const el = await selector;
    const withinQueryName = el.getAttribute('data-tctl-queryname');
    const withinArgs = JSON.parse(el.getAttribute('data-tctl-args'));

    const withinSelectors = {};
    Object.keys(queries).forEach(queryName => {
      withinSelectors[queryName] = Selector(
        new Function(`
        const {within, ${withinQueryName}} = TestingLibraryDom;
        return within(${withinQueryName}(document.body, ${JSON.stringify(...withinArgs)})).${queryName}(...arguments);
    `
        ));
    });
    return withinSelectors;
  } else if (typeof (selector) === 'string') {
    const sanitizedSelector = selector.replace(/"/g, "'");

    const withinSelectors = {};

    Object.keys(queries).forEach(queryName => {
      withinSelectors[queryName] = Selector(
        new Function(
          `
        const {within} = TestingLibraryDom;
        return within(document.querySelector("${sanitizedSelector}")).${queryName}(...arguments);
       `),
      )
    })

    return withinSelectors;
  } else {
    throw new Error(`"within" only accepts a string or another testing-library query as a parameter. ${selector} is not one of those`)
  }
}

