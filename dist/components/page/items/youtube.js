import { BaseComponent } from '../../component.js';
export class YoutubeComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="youtube">
            <div class="youtube__holder">
              <iframe class="youtube__iframe" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="youtube__description">
              <div>YouTube ❤️</div>
              <p class="youtube__title"></p>
            </div>
        </section>`);
        const youtubeTitle = this.element.querySelector('.youtube__title');
        youtubeTitle.textContent = title;
        const youtubeSrc = this.element.querySelector('.youtube__iframe');
        youtubeSrc.src = this.convertToEmbededURL(url);
    }
    convertToEmbededURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube\.com\/(?:(?:watch\?(?:v|d)=)|(?:embed\/))(\w{11}))|(?:youtu\.be\/(\w{11})))/;
        const matched = url.match(regExp);
        const videoId = matched ? matched[1] || matched[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
