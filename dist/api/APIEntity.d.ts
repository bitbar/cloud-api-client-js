import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { API } from '../API';
import { QueryParams } from './models/HTTP';
import { AbortController } from 'node-abort-controller';
export declare class APIEntity<RESPONSE = any, QUERY_PARAMS extends QueryParams | void = QueryParams, DATA = any> {
    root: API;
    protected stack: Array<string | number>;
    protected requestConfig: AxiosRequestConfig;
    protected ALLOWED_HTTP_METHODS: Array<Method>;
    protected abortController: AbortController;
    constructor(parent: APIEntity<RESPONSE> | API);
    abortRequest(): void;
    push(...items: Array<string | number>): this;
    shift(): this;
    restack(...items: Array<string | number>): this;
    get first(): string | number;
    get last(): string | number;
    set last(val: string | number);
    toUrl(absolute?: boolean): string;
    setRequestConfig(requestConfig: AxiosRequestConfig): this;
    removeRequestConfig(key: keyof AxiosRequestConfig): this;
    headers(headers: Record<string, string>): this;
    method(name: Method): this;
    get(): this;
    post(): this;
    delete(): this;
    params<T extends keyof QUERY_PARAMS = keyof QUERY_PARAMS>(params: Pick<QUERY_PARAMS, T>): this;
    getParams(): Partial<QUERY_PARAMS>;
    removeParam(key: keyof QUERY_PARAMS): this;
    data(data: DATA): this;
    jsonData(data: DATA): this;
    formData(data: DATA): this;
    send<T = RESPONSE>(): Promise<AxiosResponse<T>>;
    protected paramsSerializer(params: DATA | QUERY_PARAMS): string;
}
export default APIEntity;
