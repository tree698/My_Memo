import { BaseComponent } from '../../component.js';

export class BookComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="book">
        <p class="book__title"></p>
        <textarea class="book__summary" rows="3"></textarea>
        <a class="book__link" target="_blank">Go to Source</a>
    </section>`);

    const bookTitle = this.element.querySelector(
      '.book__title'
    )! as HTMLParagraphElement;
    bookTitle.textContent = title;

    const bookSummary = this.element.querySelector(
      '.book__summary'
    )! as HTMLTextAreaElement;
    bookSummary.textContent = summary;

    const bookLink = this.element.querySelector(
      '.book__link'
    )! as HTMLAnchorElement;
    bookLink.href = url;
  }
}
