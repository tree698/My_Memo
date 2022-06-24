import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(item: Component): void;
}

type OnCloseListener = () => void;

export interface ItemContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

type ItemContainerConstructure = {
  new (): ItemContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement>
  implements ItemContainer {
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <div class="page-item__body"></div>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(item: Component) {
    const pageItemBody = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    item.attachTo(pageItemBody);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLElement> {
  constructor(private pageItemConstructure: ItemContainerConstructure) {
    super(`<ul class="page"></ul>`);
  }

  addChild(item: Component) {
    const pageItem = new this.pageItemConstructure();
    // item을 pageItem(li) body에 추가
    pageItem.addChild(item);
    // pageItem(li)를 this.element(ul)에 추가
    pageItem.attachTo(this.element, 'beforeend');

    pageItem.setOnCloseListener(() => {
      pageItem.removeFrom(this.element);
    });
  }
}
