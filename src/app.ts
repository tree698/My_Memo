import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaInputComponent } from './components/dialog/input/media_input.js';
import { TextInputComponent } from './components/dialog/input/text_input.js';
import { BookComponent } from './components/page/items/book.js';
import { ImageComponent } from './components/page/items/image.js';
import { NewsComponent } from './components/page/items/news.js';
import { YoutubeComponent } from './components/page/items/youtube.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';

class App {
  private readonly pageForMedia: Component & Composable;
  private readonly pageForText: Component & Composable;
  constructor(dialogRoot: HTMLElement) {
    this.pageForMedia = new PageComponent(PageItemComponent);
    this.pageForText = new PageComponent(PageItemComponent);
    this.pageForMedia.attachTo(
      document.querySelector('.content__media')! as HTMLElement
    );
    this.pageForText.attachTo(
      document.querySelector('.content__text')! as HTMLElement
    );

    const imageBtn = document.querySelector('#image')! as HTMLButtonElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const mediaInput = new MediaInputComponent();
      dialog.addChild(mediaInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const image = new ImageComponent(mediaInput.title, mediaInput.url);
        this.pageForMedia.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
    });

    const youtubeBtn = document.querySelector('#youtube')! as HTMLButtonElement;
    youtubeBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const mediaInput = new MediaInputComponent();
      dialog.addChild(mediaInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const youtube = new YoutubeComponent(mediaInput.title, mediaInput.url);
        this.pageForMedia.addChild(youtube);
        dialog.removeFrom(dialogRoot);
      });
    });

    const newsBtn = document.querySelector('#news')! as HTMLButtonElement;
    newsBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const textInput = new TextInputComponent();
      dialog.addChild(textInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const news = new NewsComponent(
          textInput.title,
          textInput.url,
          textInput.summary
        );
        this.pageForText.addChild(news);
        dialog.removeFrom(dialogRoot);
      });
    });

    const bookBtn = document.querySelector('#book')! as HTMLButtonElement;
    bookBtn.addEventListener('click', () => {
      const dialog = new InputDialog();
      const textInput = new TextInputComponent();
      dialog.addChild(textInput);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const book = new BookComponent(
          textInput.title,
          textInput.url,
          textInput.summary
        );
        this.pageForText.addChild(book);
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new App(document.body);
