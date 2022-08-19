import { OsType } from './Enum';
import { CollectionBasicQueryParams, QueryParams } from './HTTP';
export declare type DeviceGroup = {
    deviceCount: number;
    displayName: string;
    id: number;
    name: string;
    osType: OsType;
    shared: boolean;
    userEmail: string;
    userId: number;
};
export interface DeviceGroupSelectorData extends QueryParams {
    selectorIds: Array<number>;
}
export interface DeviceGroupIdsData extends QueryParams {
    deviceId: number;
    deviceIds: Array<number>;
}
export interface DeviceGroupShareData extends QueryParams {
    accessGroupId: number;
    email: string;
}
export interface DeviceGroupParams extends CollectionBasicQueryParams {
    withProperties: boolean;
}
export interface DeviceGroupWithPublicParams extends CollectionBasicQueryParams {
    withPublic: boolean;
}
export declare type DeviceGroupData = Pick<DeviceGroup, 'displayName' | 'name' | 'osType'>;
