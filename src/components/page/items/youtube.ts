import { BaseComponent } from '../../component.js';

export class YoutubeComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="youtube">
            <p class="youtube__title"></p>
            <div class="youtube__holder">
              <iframe class="youtube__src" frameborder="0"></iframe>
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
    const regEx = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/gm;
    const matched = url.match(regEx);
    const videoId = matched ? matched[1] || matched[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
