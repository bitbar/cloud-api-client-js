import { Method } from 'axios';
export declare const ALLOWED_HTTP_METHODS: Array<Method>;
export declare type QueryParam = string | number | boolean;
export declare type QueryParams = Record<string, QueryParam | Array<QueryParam>>;
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
export declare type CollectionBasicQueryParams = Omit<CollectionQueryParams, 'search'>;
export declare type NoQueryParams = {
    [key in any]: never;
};
export declare type CollectionResponse<T> = {
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
export declare type SimpleCollectionResponse<T> = Pick<CollectionResponse<T>, 'data' | 'id'>;
export declare type NoData = void;
