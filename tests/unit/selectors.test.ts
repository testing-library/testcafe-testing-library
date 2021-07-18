import { queries } from "@testing-library/dom";
import * as allExports from "../../src";

it("exports expected exports", () => {
  expect(allExports).toMatchObject(expect.any(Object));

  expect(Object.keys(allExports)).toMatchSnapshot();

  const { screen, ...selectors } = allExports;

  Object.keys(selectors).forEach((selector) => {
    expect(selectors[selector as keyof typeof selectors]).toBeInstanceOf(
      Function
    );
  });

  Object.keys(screen).forEach((selector) => {
    expect(screen[selector as keyof typeof screen]).toBeInstanceOf(Function);
  });
});

it("exports all dom-testing-library queries", () => {
  const { configureOnce, configure, within, screen, ...justSelectors } =
    allExports;
  expect(Object.keys(justSelectors).sort()).toEqual(
    Object.keys(queries).sort()
  );

  expect(Object.keys(screen).sort()).toEqual(Object.keys(queries).sort());
});
