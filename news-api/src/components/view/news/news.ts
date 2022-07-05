import { IArticleInfo } from '../../../modules/types';
import './news.css';

class News {
    public draw(data: IArticleInfo[]): void | never {
        if (!data.length) throw Error('Array is empty!');

        const news: IArticleInfo[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Readonly<IArticleInfo>, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
                if (newsItem) {
                    newsItem.classList.add('alt');
                } else throw new Error('news__item is not found!');
            }

            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto) {
                newsMetaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || require('../../../assets/images/news_placeholder.jpg')
                })`;
            } else throw new Error('news__meta-photo is not found!');

            const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (newsMetaAuthor) {
                newsMetaAuthor.textContent = item.author || item.source.name;
            } else throw new Error('news__meta-author is not found!');

            const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (newsMetaDate) {
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            } else throw new Error('news__meta-date is not found!');

            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (newsDescriptionTitle) {
                newsDescriptionTitle.textContent = item.title;
            } else throw new Error('news__meta-photo is not found!');

            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (newsDescriptionSource) {
                newsDescriptionSource.textContent = item.source.name;
            } else throw new Error('news__description-sourceis not found!');

            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (newsDescriptionContent) {
                newsDescriptionContent.textContent = item.description;
            } else throw new Error('news__description-content is not found!');

            const newsReadMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');
            if (newsReadMore) {
                newsReadMore.setAttribute('href', item.url);
            } else throw new Error('news__read-more a is not found!');

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        } else throw new Error('news is not found!');
    }
}

export default News;
