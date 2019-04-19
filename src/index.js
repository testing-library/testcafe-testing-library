import { queries } from "dom-testing-library";
import { Selector } from "testcafe";

const selectors = {};
Object.keys(queries).forEach(queryName => {
  selectors[queryName] = Selector(() => queries[queryName]());
});

export default selectors;
