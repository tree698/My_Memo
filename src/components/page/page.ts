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
  muteChildren(state: 'mute' | 'unmute'): void;
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

  muteChildren(state: 'mute' | 'unmute'): void {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
}

export class PageComponent extends BaseComponent<HTMLElement>
  implements Composable {
  private children = new Set<ItemContainer>();
  private dragTarget?: ItemContainer;
  private dropTarget?: ItemContainer;

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
      this.children.delete(pageItem);
    });

    this.children.add(pageItem);

    pageItem.setOnDragStateListener(
      (target: ItemContainer, state: DragState) => {
        switch (state) {
          case 'start':
            this.dragTarget = target;
            this.updateItems('mute');
            break;
          case 'stop':
            this.dragTarget = undefined;
            this.updateItems('unmute');
            break;
          case 'enter':
            this.dropTarget = target;
            break;
          case 'leave':
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state: ${state}`);
        }
      }
    );
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, 'beforebegin');
    }
  }

  private updateItems(state: 'mute' | 'unmute') {
    this.children.forEach((item: ItemContainer) => {
      item.muteChildren(state);
    });
  }
}
