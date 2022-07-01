import { IArticlesData, INewsData } from '../../modules/types';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as Element).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: IArticlesData | INewsData) => this.view.drawNews(data as IArticlesData))
        );

        this.controller.getSources((data: IArticlesData | INewsData) => this.view.drawSources(data as INewsData));
    }
}

export default App;
