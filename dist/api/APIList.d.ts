import { AxiosResponse } from 'axios';
import { FilterBuilder } from '../FilterBuilder';
import { APIEntity } from './APIEntity';
import { APIOrder, CollectionBasicQueryParams, CollectionQueryParams, CollectionResponse, NoQueryParams, SimpleCollectionResponse } from './models/HTTP';
export declare const DEFAULT_LIMIT: number;
export declare const DEFAULT_OFFSET: number;
export type APIListQuery = CollectionBasicQueryParams | CollectionQueryParams | NoQueryParams;
export declare class APIList<RESPONSE = any, QUERY_PARAMS extends APIListQuery = CollectionQueryParams, DATA = any> extends APIEntity<CollectionResponse<RESPONSE> | SimpleCollectionResponse<RESPONSE>, QUERY_PARAMS, DATA> {
    create(data: DATA): Promise<AxiosResponse<RESPONSE>>;
    sort(name: string, order?: APIOrder): this;
    limit(limit?: number): this;
    getLimit(): number;
    noLimit(): this;
    offset(offset?: number): this;
    between(from: number, to: number): this;
    only(idx: number): this;
    page(page?: number): this;
    search(query: string): this;
    filter(filter: FilterBuilder | string): this;
    all: typeof APIList.prototype.noLimit;
    cut: typeof APIList.prototype.between;
}
export default APIList;
