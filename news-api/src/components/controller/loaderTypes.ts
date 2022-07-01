import { GetDataCallback } from '../../modules/types';

export type PropsForRespMethod = Pick<PropsForLoadMethod, 'endpoint' | 'options'>;

export type PropsForLoadMethod = {
    endpoint: string;
    callback: GetDataCallback;
    options: Partial<ApiKeyOptions>;
};

export type ApiKeyOptions = {
    readonly apiKey: string;
    readonly sources: string;
};

export enum ErrorTypes {
    NotFound = 404,
    NotAuthorize = 401,
}
