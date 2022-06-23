import { BookComponent } from './components/page/items/book.js';
import { ImageComponent } from './components/page/items/image.js';
import { NewsComponent } from './components/page/items/news.js';
import { YoutubeComponent } from './components/page/items/youtube.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent('title', 'https://picsum.photos/600/300');
    image.attachTo(appRoot, 'beforeend');

    const news = new NewsComponent(
      'test',
      'https://google.com',
      'This is my netflix'
    );
    news.attachTo(appRoot, 'beforeend');

    const book = new BookComponent(
      '호킹',
      'https://www.coupang.com/vp/products/5423927363?itemId=8198548538&vendorItemId=75486646729&src=1042503&spec=10304982&addtag=400&ctag=5423927363&lptag=10304982I8198548538&itime=20220623161435&pageType=PRODUCT&pageValue=5423927363&wPcid=25478224066663013423345&wRef=&wTime=20220623161435&redirect=landing&gclid=Cj0KCQjwntCVBhDdARIsAMEwACk84aOE_HEDKWu1Ht8Bk_JHxph9nN3jrSPa95jU6J1-gyoAxMBHNZoaAsLaEALw_wcB&campaignid=12207438463&adgroupid=115720946583&isAddedCart=',
      '감동 그 자체'
    );
    book.attachTo(appRoot, 'beforeend');

    const youtube = new YoutubeComponent(
      '이것저것',
      'https://www.youtube.com/embed/-WNimB7KMjA'
    );

    youtube.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.content__media')! as HTMLElement);
