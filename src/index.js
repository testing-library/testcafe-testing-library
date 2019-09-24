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

  const no = Selector(
    new Function(
      `
      if(!window.tctlReplacer) {
        window.tctlReplacer = function tctlReplacer(key, value) {
          if (value instanceof RegExp)  
            return ("__REGEXP " + value.toString());
          else if (typeof value === 'function') 
            return ("__FUNCTION " + value.toString());
          else
            return value;
        }
      }
      const els = TestingLibraryDom.${queryName}(document.body, ...arguments);
      if(!Array.isArray(els)) {
        els.setAttribute('data-tctl-args', JSON.stringify(Array.from(arguments), window.tctlReplacer, 0));
        els.setAttribute('data-tctl-queryname', '${queryName}');  
      } else {
        els.forEach((el,i) => {
          el.setAttribute('data-tctl-args', JSON.stringify(Array.from(arguments), window.tctlReplacer, 0));
          el.setAttribute('data-tctl-queryname', '${queryName}');  
          el.setAttribute('data-tctl-index', i);     
        });
      }
      return els;
      `,
    ),
  );
})
function reviver(key, value) {
  if (value.toString().indexOf('__REGEXP ') == 0) {
    const m = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
    return new RegExp(m[1], m[2] || '');
  } else
    return value;
}

export const within = async selector => {
  if (selector instanceof Function) {
    return within(selector());
  }

  if (selector.constructor.name === SELECTOR_TYPE) {
    const count = await selector.count;
    if (count > 1) {
      throw new Error(`within() requires a single element, found ${count}`);
    }
    const el = await selector;
    const withinQueryName = el.getAttribute('data-tctl-queryname');

    const withinArgs = JSON.parse(el.getAttribute('data-tctl-args'), reviver)
      .map(arg => {
        if (arg instanceof RegExp) {
          return arg.toString();
        } else if (arg.toString().indexOf('__FUNCTION ') == 0) {
          return (arg.replace('__FUNCTION ', ''))
        } else {
          return JSON.stringify(arg);
        }
      }).join(', ');

    const withinIndexer = el.hasAttribute('data-tctl-index') ? `[${el.getAttribute('data-tctl-index')}]` : '';

    const withinSelectors = {};
    Object.keys(queries).forEach(queryName => {
      withinSelectors[queryName] = Selector(
        new Function(`

        const {within, ${withinQueryName}} = TestingLibraryDom;
        const el = ${withinQueryName}(document.body, ${withinArgs})${withinIndexer};
        return within(el).${queryName}(...arguments);
    `
        ));
    });
    return withinSelectors;
  } else if (typeof (selector) === 'string') {
    // const sanitizedSelector = selector.replace(/"/g, "'");

    const withinSelectors = {};

    Object.keys(queries).forEach(queryName => {
      withinSelectors[queryName] = Selector((...args) => {
        // eslint-disable-next-line no-shadow
        const { within } = window.TestingLibraryDom;
        return within(document.querySelector(selector))[queryName](...args);
      }, { dependencies: { queryName, selector } }
      )
    })

    return withinSelectors;
  } else {
    throw new Error(`"within" only accepts a string or another testing-library query as a parameter. ${selector} is not one of those`)
  }
}

