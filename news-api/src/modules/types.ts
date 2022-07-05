export interface INewsData {
    status: TStatus;
    sources: INewsInfo[];
}
export interface INewsInfo {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}
export interface IArticlesData {
    status: TStatus;
    totalResults: number;
    articles: IArticleInfo[];
}
export interface IArticleInfo {
    source: IArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
export interface IArticleSource {
    id: string;
    name: string;
}

export type TApiKeyOptions = {
    apiKey: string;
    sources?: string;
    country?: string;
    language?: string;
    category?: string;
};

export type TUrlOptions = { [index: string]: string };

type TStatus = 'ok' | 'error';

type TGetData = (data: IArticlesData | INewsData) => void;
export type TGetDataCallback = TGetData | (() => void);

export enum TypesOfFilterNewsEnum {
    Category = 'category',
    Country = 'country',
    Language = 'language',
    All = 'all',
}

export enum TypesOfEndpointEnum {
    Sources = 'sources',
    Everything = 'everything',
}
