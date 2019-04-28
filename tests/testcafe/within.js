import {Selector} from 'testcafe'
import {within, addTestcafeTestingLibrary} from '../../src'

// eslint-disable-next-line babel/no-unused-expressions
fixture`within`.beforeEach(addTestcafeTestingLibrary)
  .page`http://localhost:13370`

test('getByText within container', async t => {
  const {getByText} = await within('#nested')
  await t
    .click(getByText('Button Text'))
    .expect(Selector('button').withExactText('Button Clicked').exists)
    .ok()
})

test("queryByPlaceholder doesn't find anything", async t => {
  const {queryByPlaceholderText} = await within('#nested')

  await t.expect(queryByPlaceholderText('Placeholder Text').exists).notOk()
})
