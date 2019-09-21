/* eslint-disable no-eval */
/* eslint-disable no-new-func */
import { ClientFunction, Selector } from 'testcafe'
import { queries } from '@testing-library/dom'



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
    new Function(
      `
      return TestingLibraryDom.${queryName}(document.body, ...arguments);
      `,
    ),
  )
})

export const within = selector => {
  const sanitizedSelector = selector.replace(/"/g, "'")

  const container = {}

  Object.keys(queries).forEach(queryName => {
    container[queryName] = Selector(
      new Function(
        `
        window.TestcafeTestingLibrary = window.TestcafeTestingLibrary || {}
        window.TestcafeTestingLibrary["within_${sanitizedSelector}"] = window.TestcafeTestingLibrary["within_${sanitizedSelector}"] || TestingLibraryDom.within(document.querySelector("${sanitizedSelector}"))
        return window.TestcafeTestingLibrary["within_${sanitizedSelector}"].${queryName}(...arguments)`,
      ),
    )
  })

  return container
}

