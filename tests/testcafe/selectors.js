/* eslint-disable jest/no-disabled-tests */
/* eslint-disable import/named */
import {
  getByText,
  getByPlaceholderText,
  getByLabelText,
  getByAltText,
  getByTestId,
  getAllByText,
  queryAllByText,

} from '../../src/'

// eslint-disable-next-line babel/no-unused-expressions
fixture`selectors`
  .page`http://localhost:13370`

test('getByPlaceHolderText', async t => {
  await t.typeText(
    getByPlaceholderText('Placeholder Text'),
    'Hello Placeholder',
  )
})
test('getByText', async t => {
  await t.click(getByText('getByText'))
})

test('getByLabelText', async t => {
  await t.typeText(
    getByLabelText('Label For Input Labelled By Id'),
    'Hello Input Labelled By Id',
  )
})

test('getByAltText', async t => {
  await t.click(getByAltText('Image Alt Text'))
})

test('getByTestId', async t => {
  await t.click(getByTestId('image-with-random-alt-tag'))
})

test('getAllByText', async t => {
  const chans = getAllByText(/^Jackie Chan/)
  const count = await chans.count

  await t.expect(count).eql(2)

  await t.click(chans.nth(1))
  await t.click(chans.nth(0))
})

test('queryAllByText', async t => {
  await t.expect(queryAllByText('Button Text').exists).ok()
  await t.expect(queryAllByText('Non-existing Button Text').exists).notOk()
})




test('still works after browser page load', async t => {
  await t
    .click(getByText('Go to Page 2'))
    .expect(getByText('second page').exists).ok()
})

test('still works after reload', async (t) => {
  await t.eval(() => location.reload(true));
  await t.expect(getByText('getByText').exists).ok();
});

test.skip('getByTestId only throws the error message', async t => {
  const testId = 'Some random id'
  const errorMessage = `Unable to find an element by: [data-testid="${testId}"]`
  try {
    await t.click(getByText(testId))
  } catch (e) {
    await t.expect(e).contains(errorMessage)
  }
})
