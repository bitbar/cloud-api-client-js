import {DeviceSessionType} from "./DeviceSession";

export type DeviceTime = BasicDeviceTime & {
  billableTime: number;
  createTime: number;
  endTime: number;
  freeTime: number;
  type: DeviceSessionType;
  userId: number;
  userName: string;
};

export type BasicDeviceTime = {
  deviceTime: number;
  id: number;
  selfURI: string;
}
