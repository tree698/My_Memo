import { BaseComponent } from '../../component.js';

export class MediaInputComponent extends BaseComponent<HTMLElement> {
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

  get title(): string {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  }

  get url(): string {
    const url = this.element.querySelector('#url')! as HTMLInputElement;
    return url.value;
  }
}
