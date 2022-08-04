import {DeviceState} from "./AdminDevice";

export type DeviceStatus = {
  alarmOn: boolean;
  aslOn: boolean;
  batteryLevel: number;
  bluetoothOn: boolean;
  clusterId: number;
  clusterName: string;
  deviceId: number;
  deviceName: string;
  deviceTime: number;
  deviceTimeZone: string;
  emailAccount: string;
  externalStorage: number;
  flashOn: boolean;
  id: number;
  internalStorage: number;
  internetAccess: boolean;
  locationServiceOn: boolean;
  mockLocationOn: boolean;
  monitoringOn: boolean;
  screenLocked: boolean;
  sdcardPresent: boolean;
  ssid: string;
  state: DeviceState;
  tdsVersion: string;
  testExecuting: boolean;
  tetheringOn: boolean;
  updateTime: number;
}
