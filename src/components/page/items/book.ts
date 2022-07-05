import { BaseComponent } from '../../component.js';

export class BookComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="book">
            <div class="book-container">
              <div>Book 🐤</div>
              <p class="book__title"></p>
              <p class="book__summary"></p>
              <a class="book__link" target="_blank">Go to Source</a>
          </div>
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
