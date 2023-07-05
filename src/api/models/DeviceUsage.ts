import {Device} from './Device'

export type DeviceUsage = {
  device: Device;
  failedDeviceSessions: number;
  id: number;
  totalDeviceSessions: number;
}
