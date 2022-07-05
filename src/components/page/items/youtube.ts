import { BaseComponent } from '../../component.js';

export class YoutubeComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="youtube">
            <p class="youtube__title"></p>
            <div class="youtube__holder">
              <iframe class="youtube__src" frameborder="0" allowfullscreen></iframe>
            </div>
            <a class="youtube__link" target="_blank">Go to Source</a>
        </section>`);

    const youtubeTitle = this.element.querySelector(
      '.youtube__title'
    )! as HTMLParagraphElement;
    youtubeTitle.textContent = title;

    const youtubeSrc = this.element.querySelector(
      '.youtube__src'
    )! as HTMLIFrameElement;
    youtubeSrc.src = this.convertToEmbededURL(url);

    const youtubeLink = this.element.querySelector(
      '.youtube__link'
    )! as HTMLAnchorElement;
    youtubeLink.href = url;
  }
  //  예외 처리 필요
  private convertToEmbededURL(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube\.com\/(?:(?:watch\?(?:v|d)=)|(?:embed\/))(\w{11}))|(?:youtu\.be\/(\w{11})))/;
    const matched = url.match(regExp);
    const videoId = matched ? matched[1] || matched[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
