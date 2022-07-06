import { TApiKeyOptions, TGetDataCallback } from '../../modules/types';

export type TPropsForRespMethod = Pick<TPropsForLoadMethod, 'endpoint' | 'options'>;

export type TPropsForLoadMethod = {
    endpoint: string;
    callback: TGetDataCallback;
    options: Partial<TApiKeyOptions>;
};

export enum ErrorTypes {
    NotFound = 404,
    NotAuthorize = 401,
}
