import { QueryParams } from './HTTP';
export declare enum SharedResourceType {
    DEVICE_GROUP = "DEVICE_GROUP",
    FILE = "FILE",
    PROJECT = "PROJECT"
}
export declare type SharedResource = {
    id: number;
    name: string;
    resourceId: number;
    type: SharedResourceType;
};
export interface ShareData extends QueryParams {
    accessGroupId: number;
    email: string;
}
