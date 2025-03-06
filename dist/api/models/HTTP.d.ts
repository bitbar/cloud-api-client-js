import { Method } from 'axios';
export declare const ALLOWED_HTTP_METHODS: Array<Method>;
export type QueryParam = string | number | boolean;
export type QueryParams = Record<string, QueryParam | Array<QueryParam>>;
export declare enum APIOrder {
    asc = "a",
    desc = "d"
}
export interface CollectionQueryParams extends QueryParams {
    filter: string;
    limit: number;
    offset: number;
    sort: string;
    search: string;
}
export type CollectionBasicQueryParams = Omit<CollectionQueryParams, 'search'>;
export type NoQueryParams = {
    [key in any]: never;
};
export type CollectionResponse<T> = {
    data: Array<T>;
    empty: boolean;
    id: number;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    search: string;
    sort: string;
    total: number;
};
export type SimpleCollectionResponse<T> = Pick<CollectionResponse<T>, 'data' | 'id'>;
export type NoData = void;
