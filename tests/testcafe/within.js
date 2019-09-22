import { Selector } from 'testcafe'
// eslint-disable-next-line import/named
import { within, getAllByTestId, getByTestId } from '../../src'

// eslint-disable-next-line babel/no-unused-expressions
fixture`within`
  .page`http://localhost:13370`

test('getByText within container', async t => {
  const { getByText } = await within('#nested')
  await t
    .click(getByText('Button Text'))
    .expect(Selector('button').withExactText('Button Clicked').exists)
    .ok()
})

test("queryByPlaceholder doesn't find anything", async t => {
  const { queryByPlaceholderText } = await within('#nested')

  await t.expect(queryByPlaceholderText('Placeholder Text').exists).notOk()
})

test('quotes in selector', async t => {
  const { getByText } = await within('div[id="nested"]')

  await t
    .click(getByText('Button Text'))
    .expect(Selector('button').withExactText('Button Clicked').exists)
    .ok()
});

test('still works after browser page reload', async t => {
  const nested = await within('#nested');
  await t.expect(nested.getByText('Button Text').exists).ok()

  await t.eval(() => location.reload(true));
  await t.expect(nested.getByText('Button Text').exists).ok()
});


test('works with nested selectors', async t => {
  const nested = await within(getByTestId('nested'));
  await t.expect(nested.getByText('Button Text').exists).ok()

});

test('works with nested selector from "All" query with index - regex', async t => {
  const nestedDivs = getAllByTestId(/nested/);
  await t.expect(nestedDivs.count).eql(2);
  const nested = await within(nestedDivs.nth(0));

  await t.expect(nested.getByText('Button Text').exists).ok();
});

test('works with nested selector from "All" query with index - exact:false', async t => {
  const nestedDivs = getAllByTestId('nested', { exact: false });
  await t.expect(nestedDivs.count).eql(2);
  const nested = await within(nestedDivs.nth(0));

  await t.expect(nested.getByText('Button Text').exists).ok();
});
