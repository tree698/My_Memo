import { BaseComponent } from '../../component.js';

export class NewsComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="news">
                <p class="news__title"></p>
                <textarea class="news__summary" rows="3"></textarea>
                <a class="news__link" target="_blank">Go to Source</a>
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
