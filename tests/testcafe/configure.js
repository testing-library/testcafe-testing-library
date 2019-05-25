
import { configure, getByTestId, addTestcafeTestingLibrary } from '../../src'



// eslint-disable-next-line babel/no-unused-expressions
fixture`configure`.beforeEach(addTestcafeTestingLibrary)
    .page`http://localhost:13370`


test('configure', async t => {
    await configure({ testIdAttribute: 'data-automation-id' });

    await t
        .click(getByTestId("image-with-random-alt-tag"))
})