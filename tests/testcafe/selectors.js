import { ClientFunction, Selector } from "testcafe";
import queries from "../../src";
const rtl = require("dom-testing-library");

fixture`selectors`.page`http://localhost:13370`;

test("getByText", async t => {
  const { getByText } = queries;
  debugger;
  await t.expect(getByText("getByText").exists).ok();
});
