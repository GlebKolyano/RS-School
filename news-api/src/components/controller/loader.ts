import { TApiKeyOptions, TGetDataCallback, IArticlesData, INewsData } from '../../modules/types';
import { ErrorTypes, TPropsForLoadMethod, TPropsForRespMethod } from './loaderTypes';

class Loader {
    private baseLink: string;
    private options: TApiKeyOptions;

    constructor(baseLink: string, options: TApiKeyOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp(
        { endpoint, options }: Readonly<TPropsForRespMethod>,
        callback: TGetDataCallback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        const parametresOfLoadMethod: TPropsForLoadMethod = {
            endpoint,
            callback,
            options,
        };

        this.load(parametresOfLoadMethod, 'GET');
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorTypes.NotAuthorize || res.status === ErrorTypes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<TApiKeyOptions>, endpoint: string): string {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(props: Readonly<TPropsForLoadMethod>, method: string): void {
        fetch(this.makeUrl(props.options, props.endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: IArticlesData | INewsData) => props.callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
