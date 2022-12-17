import { BaseComponent } from '../../component.js';
export class TextInputComponent extends BaseComponent {
    constructor() {
        super(`<div class="text__form">
            <div class="form__title">
                <label for="title">Title</label>
                <input type="text" id="title" />
            </div>
            <div class="form__url">
                <label for="url">URL</label>
                <input type="text" id="url" />
            </div>
            <div class="form__summary">
                <label for="summary">Summary</label>
                <textarea id="summary" rows="2"></textarea>
            </div>
        </div>`);
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
    get summary() {
        const summary = this.element.querySelector('#summary');
        return summary.value;
    }
    get url() {
        const url = this.element.querySelector('#url');
        return url.value;
    }
}
