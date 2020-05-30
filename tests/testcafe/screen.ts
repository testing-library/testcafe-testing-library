import { screen } from '../../src';

fixture`screen`.page`../../test-app/index.html`;

test("getByPlaceHolderText", async (t) => {
  await t.typeText(
    screen.getByPlaceholderText("Placeholder Text"),
    "Hello Placeholder"
  );
});

test("getByText", async (t) => {
  await t.click(screen.getByText("getByText"));
});

test("getByLabelText", async (t) => {
  await t.typeText(
    screen.getByLabelText("Label For Input Labelled By Id"),
    "Hello Input Labelled By Id"
  );
});


