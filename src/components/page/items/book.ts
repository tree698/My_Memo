import { BaseComponent } from '../../component.js';

export class BookComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="book">
        <p class="book__title"></p>
        <textarea class="book__textarea" name="" id="" cols="20" rows="3" placeholder="Summary.."></textarea>
        <a class="book__link" target="_blank">Go to Website</a>
    </section>`);

    const bookTitle = this.element.querySelector(
      '.book__title'
    )! as HTMLParagraphElement;
    bookTitle.textContent = title;

    const newsLink = this.element.querySelector(
      '.book__link'
    )! as HTMLAnchorElement;
    newsLink.href = url;

    const newsTextarea = this.element.querySelector(
      '.book__textarea'
    )! as HTMLTextAreaElement;
    newsTextarea.textContent = summary;
  }
}
