import { ClientFunction } from "testcafe";
const dtl = require("dom-testing-library");
const { queries } = dtl;

const selectors = {};
Object.keys(queries).forEach(queryName => {
  selectors[queryName] = ClientFunction(
    args => {
      return dtl[queryName](document.body, ...args);
    },
    {
      dependencies: { dtl }
    }
  );
});

export default selectors;
