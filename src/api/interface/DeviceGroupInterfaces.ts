import {CollectionBasicQueryParams} from "../APIList";
import {DeviceGroup} from "../models/DeviceGroup";
import {QueryParams} from "../models/HTTP";

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

export type DeviceGroupData = Pick<DeviceGroup, 'displayName' | 'name' | 'osType'>;
