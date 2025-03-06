import { CollectionBasicQueryParams, QueryParams } from './HTTP';
export type Tag = {
    id: number;
    name: string;
};
export interface TestRunTagsData {
    projectId: number;
    name: string;
}
export type TagsData = Pick<TestRunTagsData, 'name'>;
export interface TagsQueryParams extends CollectionBasicQueryParams {
    projectId: number;
}
export interface TaqQueryParams extends QueryParams {
    projectId: number;
}
