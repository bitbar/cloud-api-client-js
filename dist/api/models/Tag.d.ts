import { CollectionBasicQueryParams, QueryParams } from './HTTP';
export declare type Tag = {
    id: number;
    name: string;
};
export interface TestRunTagsData {
    projectId: number;
    name: string;
}
export declare type TagsData = Pick<TestRunTagsData, 'name'>;
export interface TagsQueryParams extends CollectionBasicQueryParams {
    projectId: number;
}
export interface TaqQueryParams extends QueryParams {
    projectId: number;
}
