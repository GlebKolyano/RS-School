import AppLoader from './appLoader';
import {
    TApiKeyOptions,
    TGetDataCallback,
    IArticlesData,
    INewsData,
    TypesOfFilterNewsEnum,
    TypesOfEndpointEnum,
} from '../../modules/types';
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
                endpoint: TypesOfEndpointEnum.Sources,
                options: options,
            },
            callback
        );
    }

    public getNews(e: Event, callback: TGetDataCallback): void | never {
        let target = e.target ? (e.target as HTMLElement) : null;
        const newsContainer = e.currentTarget ? (e.currentTarget as HTMLElement) : null;

        if (target && newsContainer) {
            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    let sourceId: string;

                    if (target.getAttribute('data-source-id')) {
                        sourceId = target.getAttribute('data-source-id') as string;
                    } else throw new Error('SourceId is not string!');

                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: TypesOfEndpointEnum.Everything,
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }

                if (target.parentNode !== null) target = target.parentNode as HTMLElement;
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
            case TypesOfFilterNewsEnum.Country:
                state.country = optionValue === TypesOfFilterNewsEnum.All ? '' : optionValue;
                drawSources();
                break;
            case TypesOfFilterNewsEnum.Category:
                state.category = optionValue === TypesOfFilterNewsEnum.All ? '' : optionValue;
                drawSources();
                break;
            case TypesOfFilterNewsEnum.Language:
                state.language = optionValue === TypesOfFilterNewsEnum.All ? '' : optionValue;
                drawSources();
                break;
            default:
                break;
        }
    }
}

export default AppController;
