/* eslint-disable import/named */
import { configure, configureOnce, getByTestId, getByText } from '../../src'


// eslint-disable-next-line babel/no-unused-expressions
fixture`configure`.clientScripts(configure({ testIdAttribute: 'data-automation-id' }))
    .page`http://localhost:13370`


test('supports alternative testIdAttribute', async t => {
    await t
        .click(getByTestId('image-with-random-alt-tag'))
})

test('still works after browser page load', async t => {
    await t
        .click(getByText('Go to Page 2'))
        .click(getByTestId('page2-thing'))
        .expect(getByText('second page').exists).ok()
})

test('can be used standalone', async t => {
    await configureOnce({ testIdAttribute: 'data-other-test-id' });
    await t.click(getByTestId('other-id'));
})