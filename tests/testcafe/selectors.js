import { ClientFunction, Selector } from "testcafe";
import queries from "../../src";
const rtl = require("dom-testing-library");

fixture`selectors`.page`http://localhost:13370`;

test("getByText", async t => {
  const getTheText = ClientFunction(
    () => {
      return rtl.getByText(document.body, "getByText");
    },
    {
      dependencies: { rtl }
    }
  );

  const text = await getTheText();
  await t.expect(text).eql("getByText");
});
