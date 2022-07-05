import { BaseComponent } from '../../component.js';

export class NewsComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="news">
                <div class="news-container">
                  <div>News 🐶</div>
                  <p class="news__title"></p>
                  <p class="news__summary"></p>
                  <a class="news__link" target="_blank">Go to Source</a>
                </div>
            </section>`);

    const newsTitle = this.element.querySelector(
      '.news__title'
    )! as HTMLParagraphElement;
    newsTitle.textContent = title;

    const newsSummary = this.element.querySelector(
      '.news__summary'
    )! as HTMLTextAreaElement;
    newsSummary.textContent = summary;

    const newsLink = this.element.querySelector(
      '.news__link'
    )! as HTMLAnchorElement;
    newsLink.href = url;
  }
}
