import { BaseComponent } from '../../component.js';
export class MediaInputComponent extends BaseComponent {
    constructor() {
        super(`<div class="media__form">
                <div class="form__title">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="form__url">
                    <label for="url">URL</label>
                    <input type="text" id="url">
                </div>
            </div>`);
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
    get url() {
        const url = this.element.querySelector('#url');
        return url.value;
    }
}
