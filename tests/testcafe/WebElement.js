import { t } from 'testcafe';

export default class WebElement {
    constructor(selector) {
        this.selector = selector;
    }

    async click() {
        await t.click(this.selector)
    }

}
