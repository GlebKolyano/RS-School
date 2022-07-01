import AppLoader from './appLoader';
import { GetDataCallback } from '../../modules/types';

class AppController extends AppLoader {
    public getSources(callback: GetDataCallback): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: {},
            },
            callback
        );
    }

    public getNews(e: Event, callback: GetDataCallback): void {
        let target = e.target !== null ? (e.target as Element) : null;

        const newsContainer = e.currentTarget !== null ? (e.currentTarget as Element) : null;

        if (target !== null && newsContainer !== null) {
            while (target !== newsContainer) {
                if (target?.classList.contains('source__item')) {
                    let sourceId = '';

                    if (target.getAttribute('data-source-id') !== null) {
                        sourceId = target.getAttribute('data-source-id') as string;
                    } else throw new Error('SourceId is not string type!');

                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }

                if (target.parentNode !== null) target = target.parentNode as Element;
            }
        } else throw new Error('target or newsContainer is null!');
    }
}

export default AppController;
