import {DevicesQueryParams, Platform, SoftwareVersion} from './Device';
import {OsType} from './Enum';
import {CollectionQueryParams} from './HTTP';


export enum InitStep {
  SKIP = 'SKIP',
  REBOOT = 'REBOOT',
  REBOOT_WITH_UNLOCK = 'REBOOT_WITH_UNLOCK',
  UNLOCK_ONLY = 'UNLOCK_ONLY'
}

export enum DeviceState {
  OFFLINE_CLEANING = 'OFFLINE_CLEANING',
  OFFLINE_DIRTY = 'OFFLINE_DIRTY',
  OFFLINE_FREE = 'OFFLINE_FREE',
  OFFLINE_TESTING = 'OFFLINE_TESTING',
  ONLINE_CLEANING = 'ONLINE_CLEANING',
  ONLINE_DIRTY = 'ONLINE_DIRTY',
  ONLINE_FREE = 'ONLINE_FREE',
  ONLINE_TESTING = 'ONLINE_TESTING'
}

export type AdminDevice = {
  accountId: number;
  accountName: string;
  cluster: unknown;
  comment: string;
  dedicationEndTime: number;
  deviceModelId: number;
  deviceModelName: string;
  enabled: boolean;
  fingerprint: string;
  forceRestore: boolean;
  id: number;
  initStep: InitStep;
  ipAddress: string;
  lastOnlineTime: number;
  location: string;
  locked: boolean;
  manufacturer: string;
  name: string;
  osType: OsType;
  ownerHasAccountService: boolean;
  platform: Platform;
  serialId: string;
  softwareVersion: SoftwareVersion;
  state: DeviceState;
  stateChangeTime: number;
  stateTime: number;
  testTimeLimit: number;
  unlockGesture: string;
}

export type AdminDevicesQueryParams = Pick<DevicesQueryParams, 'withDisabled'> & CollectionQueryParams;

export type AdminDeviceData = Pick<AdminDevice, 'accountId' | 'enabled' | 'initStep' | 'ipAddress' | 'name' |
  'serialId' | 'testTimeLimit' | 'unlockGesture'> & {apiLevel: number; releaseVersion: string};
