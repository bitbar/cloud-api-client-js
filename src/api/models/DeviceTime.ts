export type DeviceTime = BasicDeviceTime & {
  billableTime: number;
  createTime: number;
  endTime: number;
  freeTime: number;
  type: 'AUTOMATIC' | 'MANUAL' | 'MANUAL_APP' | 'MANUAL_WEB' | 'REMOTE';
  userId: number;
  userName: string;
};

export type BasicDeviceTime = {
  deviceTime: number;
  id: number;
  selfURI: string;
}
