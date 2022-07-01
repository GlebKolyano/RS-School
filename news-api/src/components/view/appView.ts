import { IArticlesData, INewsData, INewsInfo, IArticleInfo } from '../../modules/types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<IArticlesData>): void {
        const values: IArticleInfo[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Readonly<INewsData>): void {
        const values: INewsInfo[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
