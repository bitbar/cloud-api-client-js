import { DeviceSessionType } from './DeviceSession';
import { CollectionQueryParams } from './HTTP';
export declare type UserDeviceTime = BasicDeviceTime & {
    billableTime: number;
    createTime: number;
    endTime: number;
    freeTime: number;
    type: DeviceSessionType;
    userId: number;
    userName: string;
};
export declare type BasicDeviceTime = {
    deviceTime: number;
    id: number;
};
export interface DeviceTimeParams extends CollectionQueryParams {
    forWholeAccount: boolean;
}
export interface DeviceTimeQueryParams extends CollectionQueryParams {
    forWholeAccount: boolean;
}
