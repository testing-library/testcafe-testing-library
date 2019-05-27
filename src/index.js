/* eslint-disable no-eval */
/* eslint-disable no-new-func */
import fs from 'fs'
import path from 'path'
import { ClientFunction, Selector } from 'testcafe'
import { queries } from 'dom-testing-library'

const DOM_TESTING_LIBRARY_UMD_PATH = path.join(
  './node_modules',
  'dom-testing-library/dist/dom-testing-library.umd.js',
)
const DOM_TESTING_LIBRARY_UMD = fs.readFileSync(DOM_TESTING_LIBRARY_UMD_PATH).toString()




export async function configure(options, t) {
  const configFunction =
    `
  window.DomTestingLibrary.configure(${JSON.stringify(options)});
`;
  await new ClientFunction(new Function(configFunction))();

  if (t) {
    t.testRun.injectable.scripts.push('/testcafe-testing-library-config.js');
    t.testRun.session.proxy.GET('/testcafe-testing-library-config.js', { content: configFunction, contentType: 'application/x-javascript' })
  }

}

export async function addTestcafeTestingLibrary(t) {
  // inject for 1st pageload.  Then just use injectables for subsequent page loads.
  // eslint-disable-next-line
  const inject = ClientFunction(
    () => {
      // eslint-disable-next-line no-undef
      window.eval(script)
    },
    {
      dependencies: { script: DOM_TESTING_LIBRARY_UMD },
    },
  )

  await inject.with({ boundTestRun: t })();

  //and for subsequent pageloads:
  t.testRun.injectable.scripts.push('/dom-testing-library.js');
  t.testRun.session.proxy.GET('/dom-testing-library.js', { content: DOM_TESTING_LIBRARY_UMD, contentType: 'application/x-javascript' })

  if (addTestcafeTestingLibrary.options) {
    await configure(addTestcafeTestingLibrary.options, t);
  }

}

// eslint-disable-next-line no-shadow
addTestcafeTestingLibrary.configure = function configure(options) {
  addTestcafeTestingLibrary.options = { ...options };
  return addTestcafeTestingLibrary;
}

Object.keys(queries).forEach(queryName => {
  module.exports[queryName] = Selector(
    new Function(
      `
      return DomTestingLibrary.${queryName}(document.body, ...arguments);
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
      window.TestcafeTestingLibrary["within_${sanitizedSel}"] = DomTestingLibrary.within(elem);

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

