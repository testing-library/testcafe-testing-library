/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable new-cap */
import { Selector } from "testcafe";
import { within, screen } from "../../src";

fixture`within`.page`../../test-app/index.html`;

test("getByText within container", async (t) => {
  const { getByText } = await within("#nested");
  await t
    .click(getByText("Button Text"))
    .expect(Selector("button").withExactText("Button Clicked").exists)
    .ok();
});

test("queryByPlaceholder doesn't find anything", async (t) => {
  const { queryByPlaceholderText } = await within("#nested");

  await t.expect(queryByPlaceholderText("Placeholder Text").exists).notOk();
});

test("quotes in selector", async (t) => {
  const { getByText } = await within('div[id="nested"]');

  await t
    .click(getByText("Button Text"))
    .expect(Selector("button").withExactText("Button Clicked").exists)
    .ok();
});

test("still works after browser page reload", async (t) => {
  const nested = await within("#nested");
  await t.expect(nested.getByText("Button Text").exists).ok();

  await t.eval(() => location.reload());
  await t.expect(nested.getByText("Button Text").exists).ok();
});

test("works with nested selectors", async (t) => {
  await t
    .expect(
      within(screen.getByTestId("nested")).getByText("Button Text").exists
    )
    .ok();
});

test('works with nested selector from "All" query with index - regex', async (t) => {
  const nestedDivs = screen.getAllByTestId(/nested/);
  await t.expect(nestedDivs.count).eql(2);

  const nested = within(nestedDivs.nth(1));

  await t
    .expect(nested.getByText("Button Text").exists)
    .ok()
    .expect(nested.getByText("text only in 2nd nested").exists)
    .ok();
});

test('works with nested selector from "All" query with index - exact:false', async (t) => {
  const nestedDivs = screen.getAllByTestId("nested", { exact: false });
  await t.expect(nestedDivs.count).eql(2);
  const nested = await within(nestedDivs.nth(0));

  await t.expect(nested.getByText("Button Text").exists).ok();
});

test('works with nested selector from "All" query with index - function', async (t) => {
  const nestedDivs = screen.getAllByTestId((_content, element) =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    element!.getAttribute("data-testid")!.startsWith("nested")
  );
  await t.expect(nestedDivs.count).eql(2);
  const nested = await within(nestedDivs.nth(0));

  await t.expect(nested.getByText("Button Text").exists).ok();
});

test("works on a standard testcafe nested selector", async (t) => {
  const nested = Selector("#nested");

  await t.expect(within(nested).getByText("Button Text").exists).ok();
});

test("should throw if invalid param", async (t) => {
  let didThrow = false;
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await t.expect(within({ foo: "bar" }).getByText("baz").exists).ok();
    // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
  } catch (e) {
    didThrow = true;
  }
  await t.expect(didThrow).ok();
});

test("should throw error if count > 1", async (t) => {
  const nestedDivs = screen.getAllByTestId(/nested/);

  await t.expect(nestedDivs.count).eql(2);
  let didThrow = false;
  try {
    await t.expect(within(nestedDivs).getByText("blah").exists);
    // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
  } catch (e) {
    didThrow = true;
  }
  await t.expect(didThrow).ok();
});

test("works with findBy queries", async (t) => {
  const group = screen.findByRole("group", { name: "My Group" });

  await t
    .click(within(group).findByRole("button", { name: "Increase B" }))
    .expect(within(group).findByText("1").exists)
    .ok();
});
