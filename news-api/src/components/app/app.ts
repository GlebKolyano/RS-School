import { ApiKeyOptions, IArticlesData, INewsData } from '../../modules/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    private state: ApiKeyOptions = {
        apiKey: '70051855752f4291b17002057fbdeb36',
    };

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as Element).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: IArticlesData | INewsData) => this.view.drawNews(data as IArticlesData))
        );

        this.controller.getSources(
            (data: IArticlesData | INewsData) => this.view.drawSources(data as INewsData),
            this.state
        );
        // implement draw selects and filter news method
        this.controller.getSources(
            (data: IArticlesData | INewsData) => this.view.drawSelects(data as INewsData),
            this.state
        );

        document.querySelectorAll('.news-sort').forEach((el) => {
            el.addEventListener('change', (e) => this.controller.filterNews(e, this.state));
        });
    }
}

export default App;
