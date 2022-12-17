import { BaseComponent } from '../component.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li draggable="true" class="page-item">
            <div class="page-item__body"></div>
            <div class="page-item__controls">
              <button class="item__close">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </li>`);
        const closeBtn = this.element.querySelector('.item__close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener('dragenter', (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event) => {
            this.onDragLeave(event);
        });
    }
    addChild(item) {
        const pageItemBody = this.element.querySelector('.page-item__body');
        item.attachTo(pageItemBody);
    }
    onDragStart(_) {
        this.notifyDragObserver('start');
        this.element.classList.add('item-lift');
    }
    onDragEnd(_) {
        this.notifyDragObserver('stop');
        this.element.classList.remove('item-lift');
    }
    onDragEnter(_) {
        this.notifyDragObserver('enter');
        this.element.classList.add('drag-area');
    }
    onDragLeave(_) {
        this.notifyDragObserver('leave');
        this.element.classList.remove('drag-area');
    }
    onDropped() {
        this.element.classList.remove('drag-area');
    }
    notifyDragObserver(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructure) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructure = pageItemConstructure;
        this.children = new Set();
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    addChild(item) {
        const pageItem = new this.pageItemConstructure();
        pageItem.addChild(item);
        pageItem.attachTo(this.element, 'beforeend');
        pageItem.setOnCloseListener(() => {
            pageItem.removeFrom(this.element);
            this.children.delete(pageItem);
        });
        this.children.add(pageItem);
        pageItem.setOnDragStateListener((target, state) => {
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
        });
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDrop(event) {
        event.preventDefault();
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY > srcElement.y ? 'afterend' : 'beforebegin');
        }
        this.dropTarget.onDropped();
    }
    updateItems(state) {
        this.children.forEach((item) => {
            item.muteChildren(state);
        });
    }
}
