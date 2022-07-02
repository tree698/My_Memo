import { BaseComponent, Component } from '../component.js';
import { Composable } from '../page/page.js';

type OnListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly summary: string;
  readonly url: string;
}

export class InputDialog extends BaseComponent<HTMLElement>
  implements Composable {
  closeListener?: OnListener;
  submitListener?: OnListener;
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

    const closeBtn = this.element.querySelector(
      '.dialog__close'
    )! as HTMLButtonElement;
    const submitBtn = this.element.querySelector(
      '.dialog__submit'
    )! as HTMLButtonElement;

    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }
  setOnCloseListener(listener: OnListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnListener) {
    this.submitListener = listener;
  }

  addChild(item: Component): void {
    const body = this.element.querySelector('.dialog__body')! as HTMLElement;
    item.attachTo(body);
  }
}
