import { BaseComponent } from '../../component.js';
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="image">
            <div class="image__holder">
              <a class="image__link" target="_blank">
                <img class="image__thumbnail">
              </a>
            </div>
            <div class="image__description">
              <div>Image 🎉</div>
              <p class="image__title"></p>
            </div>
          </section>
    `);
        const imageTitle = this.element.querySelector('.image__title');
        imageTitle.textContent = title;
        const imageSrc = this.element.querySelector('.image__thumbnail');
        imageSrc.alt = title;
        imageSrc.src = url;
        const imageLink = this.element.querySelector('.image__link');
        imageLink.href = url;
    }
}
