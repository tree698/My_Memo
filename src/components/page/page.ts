import { BaseComponent } from '../component.js';

export class PageComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<ul class="page">This is a Page</ul>`);
  }
}
