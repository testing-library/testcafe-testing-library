import { ClientFunction, Selector } from "testcafe";
import { queries } from "dom-testing-library";

import fs from "fs";
import path from "path";
const DOM_TESTING_LIBRARY_PATH = path.dirname(
  require.resolve("dom-testing-library")
);
const DOM_TESTING_LIBRARY_UMD = fs
  .readFileSync(
    path.join(DOM_TESTING_LIBRARY_PATH, "dom-testing-library.umd.js")
  )
  .toString();

//TODO: figure out how to do this without having to use the external CDN.
export const addTestcafeTestingLibrary = async t => {
  var inject = ClientFunction(function() {
    return new Promise(resolve => {
      var script = document.createElement("script");
      script.id = script.src =
        "https://unpkg.com/dom-testing-library@3.19.4/dist/dom-testing-library.umd.js";
      script.onload = resolve;
      document.head.appendChild(script);
    });
  });

  await inject.with({ boundTestRun: t })();
};

Object.keys(queries).forEach(queryName => {
  module.exports[queryName] = Selector(
    new Function(
      `
      return DomTestingLibrary.${queryName}(document.body, ...arguments);
      `
    )
  );
});
