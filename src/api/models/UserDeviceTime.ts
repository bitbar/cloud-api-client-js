import {DeviceSessionType} from './DeviceSession';
import {CollectionQueryParams} from './HTTP';


export type UserDeviceTime = {
  createTime: number;
  duration: number;
  endTime: number;
  id: number;
  type: DeviceSessionType;
  userId: number;
  userName: string;
};

export interface DeviceTimeParams extends CollectionQueryParams {
  forWholeAccount: boolean;
}

export interface DeviceTimeQueryParams extends CollectionQueryParams {
  forWholeAccount: boolean;
}
