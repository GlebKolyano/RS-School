import { ApiKeyOptions, GetDataCallback } from '../../modules/types';

export type PropsForRespMethod = Pick<PropsForLoadMethod, 'endpoint' | 'options'>;

export type PropsForLoadMethod = {
    endpoint: string;
    callback: GetDataCallback;
    options: Partial<ApiKeyOptions>;
};

export enum ErrorTypes {
    NotFound = 404,
    NotAuthorize = 401,
}
