import { InputDialog, } from './components/dialog/dialog.js';
import { MediaInputComponent } from './components/dialog/input/media_input.js';
import { TextInputComponent } from './components/dialog/input/text_input.js';
import { BookComponent } from './components/page/items/book.js';
import { ImageComponent } from './components/page/items/image.js';
import { NewsComponent } from './components/page/items/news.js';
import { YoutubeComponent } from './components/page/items/youtube.js';
import { PageComponent, PageItemComponent, } from './components/page/page.js';
class App {
    constructor(dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.pageForMedia = new PageComponent(PageItemComponent);
        this.pageForText = new PageComponent(PageItemComponent);
        this.pageForMedia.attachTo(document.querySelector('.content__media'));
        this.pageForText.attachTo(document.querySelector('.content__text'));
        this.bindElementToDialog('#image', MediaInputComponent, (input) => new ImageComponent(input.title, input.url), 'content__media');
        this.bindElementToDialog('#youtube', MediaInputComponent, (input) => new YoutubeComponent(input.title, input.url), 'content__media');
        this.bindElementToDialog('#news', TextInputComponent, (input) => new NewsComponent(input.title, input.url, input.summary), 'content__text');
        this.bindElementToDialog('#book', TextInputComponent, (input) => new BookComponent(input.title, input.url, input.summary), 'content__text');
    }
    bindElementToDialog(selector, InputDialogType, makeItem, position) {
        const element = document.querySelector(selector);
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
