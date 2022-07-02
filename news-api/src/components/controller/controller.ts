import AppLoader from './appLoader';
import { ApiKeyOptions, GetDataCallback, IArticlesData, INewsData } from '../../modules/types';
import AppView from '../view/appView';

class AppController extends AppLoader {
    private view: AppView;
    constructor() {
        super();
        this.view = new AppView();
    }

    public getSources(callback: GetDataCallback, options: ApiKeyOptions): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: options,
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

    public filterNews(e: Event, state: ApiKeyOptions): void {
        const select: string = (e.target as HTMLInputElement).name;
        const optionValue = (e.target as HTMLInputElement).value;

        const drawSources = (): void => {
            this.getSources((data: IArticlesData | INewsData) => this.view.drawSources(data as INewsData), state);
        };

        switch (select) {
            case 'country':
                state.country = optionValue === 'all' ? '' : optionValue;
                drawSources();
                break;
            case 'category':
                state.category = optionValue === 'all' ? '' : optionValue;
                drawSources();
                break;
            case 'language':
                state.language = optionValue === 'all' ? '' : optionValue;
                drawSources();
                break;
            default:
                break;
        }
    }
}

export default AppController;
