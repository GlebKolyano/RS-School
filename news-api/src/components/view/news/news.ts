import { IArticleInfo } from '../../../modules/types';
import { isNotNullElement } from '../../../services/Addtional.service';

import './news.css';

class News {
    public draw(data: IArticleInfo[]): void {
        if (!data.length) throw Error('Array is empty!');

        const news: IArticleInfo[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Readonly<IArticleInfo>, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) {
                if (isNotNullElement(newsClone, '.news__item')) {
                    (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');
                } else throw new Error('news__item is not found!');
            }
            if (isNotNullElement(newsClone, '.news__meta-photo')) {
                (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            } else throw new Error('news__meta-photo is not found!');

            if (isNotNullElement(newsClone, '.news__meta-author')) {
                (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                    item.author || item.source.name;
            } else throw new Error('news__meta-author is not found!');

            if (isNotNullElement(newsClone, '.news__meta-date')) {
                (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            } else throw new Error('news__meta-date is not found!');

            if (isNotNullElement(newsClone, '.news__meta-photo')) {
                (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            } else throw new Error('news__meta-photo is not found!');

            if (isNotNullElement(newsClone, '.news__description-source')) {
                (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
            } else throw new Error('news__description-sourceis not found!');

            if (isNotNullElement(newsClone, '.news__description-content')) {
                (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            } else throw new Error('news__description-content is not found!');

            if (isNotNullElement(newsClone, '.news__read-more a')) {
                (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);
            } else throw new Error('news__read-more a is not found!');

            fragment.append(newsClone);
        });

        if (document.querySelector('.news') !== null) {
            const newsElement = document.querySelector('.news') as HTMLElement;
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        } else throw new Error('news is not found!');
    }
}

export default News;
