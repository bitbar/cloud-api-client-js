import { AxiosRequestConfig, Method } from 'axios';
declare class APIEntity {
    stack: Array<string | number>;
    protected requestConfig: AxiosRequestConfig;
    root: object;
    constructor(parent: APIEntity | object);
    push(...items: Array<string | number>): this;
    pop(): this;
    get first(): string | number;
    set first(val: string | number);
    get last(): string | number;
    set last(val: string | number);
    toUrl(absolute?: boolean): string;
    setRequestConfig(requestConfig: AxiosRequestConfig): this;
    removeRequestConfig(key: string): this;
    headers(headers: object): this;
    method(name: Method): this;
    get(): this;
    post(): this;
    params(params: object): this;
    getParams(): any;
    removeParam(key: string): this;
    data(data: object): this;
    jsonData(data: object): this;
    formData(data: FormData): this;
    private paramsSerializer;
    send(): any;
}
export default APIEntity;
