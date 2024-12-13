import {Platform} from './Device';
import {OsType} from './Enum';

export type DeviceModel = {
  avgWaitingTime: number;
  dedicated: boolean;
  enabled: boolean;
  id: number;
  location: string;
  name: string;
  online: number;
  osType: OsType;
  platform: Platform;
  queueSize: number;
  releaseVersion: string;
  running: number;
  total: number;
  freeTrial: boolean
}

export type DeviceModelData = Pick<DeviceModel, 'enabled' | 'name' | 'releaseVersion'> & {
  apiLevel: number;
  creditsPrice: number;
  manufacturer: string;
  typeId: number;
}
