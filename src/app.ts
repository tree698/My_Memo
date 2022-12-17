import { Component } from './components/component.js';
import {
  InputDialog,
  MediaData,
  TextData,
} from './components/dialog/dialog.js';
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

type InputDialogConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

type Position = 'content__media' | 'content__text';

class App {
  private readonly pageForMedia: Component & Composable;
  private readonly pageForText: Component & Composable;
  constructor(private dialogRoot: HTMLElement) {
    this.pageForMedia = new PageComponent(PageItemComponent);
    this.pageForText = new PageComponent(PageItemComponent);

    this.pageForMedia.attachTo(
      document.querySelector('.content__media')! as HTMLElement
    );
    this.pageForText.attachTo(
      document.querySelector('.content__text')! as HTMLElement
    );

    this.bindElementToDialog<MediaInputComponent>(
      '#image',
      MediaInputComponent,
      (input: MediaInputComponent) =>
        new ImageComponent(input.title, input.url),
      'content__media'
    );

    this.bindElementToDialog<MediaInputComponent>(
      '#youtube',
      MediaInputComponent,
      (input: MediaInputComponent) =>
        new YoutubeComponent(input.title, input.url),
      'content__media'
    );

    this.bindElementToDialog<TextInputComponent>(
      '#news',
      TextInputComponent,
      (input: TextInputComponent) =>
        new NewsComponent(input.title, input.url, input.summary),
      'content__text'
    );

    this.bindElementToDialog<TextInputComponent>(
      '#book',
      TextInputComponent,
      (input: TextInputComponent) =>
        new BookComponent(input.title, input.url, input.summary),
      'content__text'
    );

    // For demo :)
    // this.pageForMedia.addChild(
    //   new ImageComponent('Image Title', 'https://picsum.photos/800/400')
    // );
    // this.pageForMedia.addChild(
    //   new YoutubeComponent(
    //     'Video Title',
    //     'https://www.youtube.com/embed/-WNimB7KMjA'
    //   )
    // );
    // this.pageForText.addChild(
    //   new NewsComponent(
    //     'Note Title',
    //     'https://naver.com',
    //     "Don't forget to code your dream"
    //   )
    // );
    // this.pageForText.addChild(
    //   new BookComponent('Todo Title', 'https://naver.com', 'TypeScript Course!')
    // );
    // this.pageForMedia.addChild(
    //   new ImageComponent('Image Title', 'https://picsum.photos/800/400')
    // );
    // this.pageForMedia.addChild(
    //   new YoutubeComponent(
    //     'Video Title',
    //     'https://www.youtube.com/embed/-WNimB7KMjA'
    //   )
    // );
    // this.pageForText.addChild(
    //   new NewsComponent(
    //     'Note Title',
    //     'https://naver.com',
    //     "Don't forget to code your dream"
    //   )
    // );
    // this.pageForText.addChild(
    //   new BookComponent('Todo Title', 'https://naver.com', 'TypeScript Course!')
    // );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputDialogType: InputDialogConstructor<T>,
    makeItem: (input: T) => Component,
    position: Position
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputDialogType();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const item = makeItem(input);
        position == 'content__media'
          ? this.pageForMedia.addChild(item)
          : this.pageForText.addChild(item);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.body);
