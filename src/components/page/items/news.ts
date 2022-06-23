import { BaseComponent } from '../../component.js';

export class NewsComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string, summary: string) {
    super(`<section class="news">
                <p class="news__title"></p>
                <textarea class="news__textarea" name="" id="" cols="20" rows="3" placeholder="Summary.."></textarea>
                <a class="news__link" target="_blank">Go to Website</a>
            </section>`);

    const newsTitle = this.element.querySelector(
      '.news__title'
    )! as HTMLParagraphElement;
    newsTitle.textContent = title;

    const link = this.element.querySelector(
      '.news__link'
    )! as HTMLAnchorElement;
    link.href = url;

    const textarea = this.element.querySelector(
      '.news__textarea'
    )! as HTMLTextAreaElement;
    textarea.textContent = summary;
  }
}
