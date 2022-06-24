import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(item: Component): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<li class="page-item">
            <div class="page-item__body"></div>
            <div class="page-item__control">
              <button>&times;</button>
            </div>
          </li>`);
  }

  addChild(item: Component) {
    const pageItemBody = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    item.attachTo(pageItemBody);
  }
}

export class PageComponent extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<ul class="page">This is a Page</ul>`);
  }

  addChild(item: Component) {
    const pageItem = new PageItemComponent();
    // 각 item을 pageItem(li) body에 추가
    pageItem.addChild(item);
    // pageItem(li)를 this.element(ul)에 추가
    pageItem.attachTo(this.element, 'beforeend');
  }
}
