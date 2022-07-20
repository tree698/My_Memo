import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(item: Component): void;
}

type OnCloseListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

export interface ItemContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<ItemContainer>): void;
}

type ItemContainerConstructure = {
  new (): ItemContainer;
};

export class PageItemComponent extends BaseComponent<HTMLElement>
  implements ItemContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(`<li draggable="true" class="page-item">
            <div class="page-item__body"></div>
            <div class="page-item__controls">
              <button class="item__close">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector(
      '.item__close'
    )! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    this.element.addEventListener('dragstart', (event: DragEvent) => {
      this.onDragStart(event);
    });
    this.element.addEventListener('dragend', (event: DragEvent) => {
      this.onDragEnd(event);
    });
    this.element.addEventListener('dragenter', (event: DragEvent) => {
      this.onDragEnter(event);
    });
    this.element.addEventListener('dragleave', (event: DragEvent) => {
      this.onDragLeave(event);
    });
  }

  addChild(item: Component) {
    const pageItemBody = this.element.querySelector(
      '.page-item__body'
    )! as HTMLElement;
    item.attachTo(pageItemBody);
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObserver('start');
  }

  onDragEnd(_: DragEvent) {
    this.notifyDragObserver('stop');
  }

  onDragEnter(_: DragEvent) {
    this.notifyDragObserver('enter');
  }

  onDragLeave(_: DragEvent) {
    this.notifyDragObserver('leave');
  }

  notifyDragObserver(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent extends BaseComponent<HTMLElement> {
  constructor(private pageItemConstructure: ItemContainerConstructure) {
    super(`<ul class="page"></ul>`);

    this.element.addEventListener('dragover', (event: DragEvent) => {
      this.onDragOver(event);
    });
    this.element.addEventListener('drop', (event: DragEvent) => {
      this.onDrop(event);
    });
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

    pageItem.setOnDragStateListener(
      (target: ItemContainer, state: DragState) => {
        console.log(target, state);
      }
    );
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log('dragover', event);
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('dorp', event);
  }
}
