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

export const within = async sel => {
  const sanitizedSel = sel.replace(/"/g, "'")
  await ClientFunction(
    new Function(
      ` 

      window.TestcafeTestingLibrary = window.TestcafeTestingLibrary || {}
      const elem = document.querySelector("${sanitizedSel}");
      window.TestcafeTestingLibrary["within_${sanitizedSel}"] = TestingLibraryDom.within(elem);

    `,
    ),
  )()
  const container = {}

  Object.keys(queries).forEach(queryName => {
    container[queryName] = Selector(
      new Function(
        `return window.TestcafeTestingLibrary["within_${sanitizedSel}"].${queryName}(...arguments)`,
      ),
    )
  })

  return container
}

