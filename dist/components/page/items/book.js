import { BaseComponent } from '../../component.js';
export class BookComponent extends BaseComponent {
    constructor(title, url, summary) {
        super(`<section class="book">
            <div class="book-container">
              <div>Book 🐤</div>
              <p class="book__title"></p>
              <p class="book__summary"></p>
              <a class="book__link" target="_blank">Go to Source</a>
          </div>
    </section>`);
        const bookTitle = this.element.querySelector('.book__title');
        bookTitle.textContent = title;
        const bookSummary = this.element.querySelector('.book__summary');
        bookSummary.textContent = summary;
        const bookLink = this.element.querySelector('.book__link');
        bookLink.href = url;
    }
}
