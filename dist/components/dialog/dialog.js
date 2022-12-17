import { BaseComponent } from '../component.js';
export class InputDialog extends BaseComponent {
    constructor() {
        super(`<dialog class="dialog">
            <div class="dialog__container">
                <button class="dialog__close">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <div class="dialog__body"></div>
                <button class="dialog__submit">Add</button>
            </div>
        </dialog>`);
        const closeBtn = this.element.querySelector('.dialog__close');
        const submitBtn = this.element.querySelector('.dialog__submit');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(item) {
        const body = this.element.querySelector('.dialog__body');
        item.attachTo(body);
    }
}
