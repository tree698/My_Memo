import { BaseComponent } from '../../component.js';

export class YoutubeComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="youtube">
            <p class="youtube__title"></p>
            <iframe class="youtube__video" frameborder="0"></iframe>
        </section>`);

    const youtubeTitle = this.element.querySelector(
      '.youtube__title'
    )! as HTMLParagraphElement;
    youtubeTitle.textContent = title;

    const youtubeVideo = this.element.querySelector(
      '.youtube__video'
    )! as HTMLIFrameElement;
    youtubeVideo.src = this.convertToEmbededURL(url);
  }

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
