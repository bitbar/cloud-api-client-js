import { CollectionQueryParams } from './HTTP';
export declare type Property = {
    description: string;
    fromTime: number;
    id: number;
    name: string;
    toTime: number;
    updateTime: number;
    updatedByDisplayName: string;
    updatedById: number;
    value: string;
};
export declare type PropertyData = Pick<Property, 'description' | 'fromTime' | 'name' | 'toTime' | 'value'>;
export interface AppBansQueryParams extends CollectionQueryParams {
    testRunId: number;
}
export declare type AppBansData = AppBansQueryParams;
