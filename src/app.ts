import { ImageComponent } from './components/page/items/image.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent('title', 'https://picsum.photos/600/300');
    image.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.content__media')! as HTMLElement);
