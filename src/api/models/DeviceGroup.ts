import {OsType} from './Enum';
import {CollectionBasicQueryParams, QueryParams} from './HTTP';


export type DeviceGroup = {
  deviceCount: number;
  displayName: string;
  id: number;
  name: string;
  osType: OsType;
  shared: boolean;
  userEmail: string;
  userId: number;
}

export interface DeviceGroupSelectorData extends QueryParams {
  selectorIds: Array<number>;
}
export interface DeviceGroupIdsData extends QueryParams {
  deviceId: number;
  deviceIds: Array<number>;
}

export interface DeviceGroupParams extends CollectionBasicQueryParams {
  withProperties: boolean;
}

export interface DeviceGroupWithPublicParams extends CollectionBasicQueryParams {
  withPublic: boolean;
}

export type DeviceGroupData = Pick<DeviceGroup, 'displayName' | 'name' | 'osType'>;
