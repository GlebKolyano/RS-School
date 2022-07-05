import AppLoader from './appLoader';
import { TApiKeyOptions, TGetDataCallback, IArticlesData, INewsData } from '../../modules/types';
import AppView from '../view/appView';

class AppController extends AppLoader {
    private view: AppView;
    constructor() {
        super();
        this.view = new AppView();
    }

    public getSources(callback: TGetDataCallback, options: TApiKeyOptions): void {
        super.getResp(
            {
                endpoint: 'sources',
                options: options,
            },
            callback
        );
    }

    public getNews(e: Event, callback: TGetDataCallback): void {
        let target = e.target ? (e.target as HTMLElement) : null;

        const newsContainer = e.currentTarget ? (e.currentTarget as HTMLElement) : null;

        if (target && newsContainer) {
            while (target !== newsContainer) {
                if (target?.classList.contains('source__item')) {
                    let sourceId = '';

                    if (target.getAttribute('data-source-id')) {
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

                if (target) {
                    if (target.parentNode !== null) target = target.parentNode as HTMLElement;
                }
            }
        } else throw new Error('target or newsContainer is null!');
    }

    public filterNews(e: Event, state: TApiKeyOptions): void {
        const { name: select } = e.target as HTMLInputElement;
        const { value: optionValue } = e.target as HTMLInputElement;

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
