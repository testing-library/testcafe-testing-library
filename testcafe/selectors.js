import selectors from "../src";

const { getByText } = selectors;

fixture`selectors`;

test("getByText", async t => {
  const boundSelector = getByText.with({ boundTestRun: t });
  await t.expect(boundSelector("getByText").exists).ok();
});
