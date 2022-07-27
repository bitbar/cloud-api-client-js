import {CollectionResponse} from "../APIList";
import {Browser} from "./Browser";
import {OsType} from "./Enum";

export enum DeviceGroupOrigin {
  STATIC = 'STATIC',
  DYNAMIC = 'DYNAMIC',
  HYBRID = 'HYBRID'
}

export enum Platform {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WINDOWS = 'WINDOWS',
  MAC = 'MAC',
  LINUX = 'LINUX',
  UNDEFINED = 'UNDEFINED'
}

export enum SupportedCreators {
  MANUAL = 'MANUAL',
  ROBOT = 'ROBOT',
  AUTOMATIC = 'AUTOMATIC'
}

export type DeviceProperty = {
  displayName: string;
  id: number;
  labelGroupName: string;
  name: string;
  propertyGroupId: number;
  propertyGroupName: string;
}

export type SoftwareVersion = {
  apiLevel: number;
  id: number;
  releaseVersion: string;
}

export type Device = {
  accountId: number;
  available: boolean;
  browsers: CollectionResponse<Browser>;
  creditsPrice: number;
  deviceGroupOrigin: DeviceGroupOrigin;
  displayName: string;
  enabled: boolean;
  frame100Url: string;
  frame160Url: string;
  frame400Url: string;
  frame80Url: string;
  frameExtraWidth: number;
  id: number;
  imageHeight: number;
  imageLeft: number;
  imagePrefix: string;
  imageTop: number;
  imageWidth: number;
  locked: boolean;
  example: true
  mainUserEmail: string;
  manufacturer: string;
  online: boolean;
  osType: OsType;
  platform: Platform;
  properties: CollectionResponse<DeviceProperty>;
  softwareVersion: SoftwareVersion;
  supportedCreators: SupportedCreators;
}

export type DeviceCleanupConfiguration = {
  content: string;
  createTime: number;
  createdByEmail: string;
  createdById: number;
  discriminator: string;
  enabled: boolean;
  global: boolean;
  example: true
  id: number;
  lastModificationTime: number;
  osType: OsType;
}

export type DeviceCleanupConfigurationData = {
  deviceCleanupConfigurationId: number;
}

export type DeviceLabelData = {
  labelId: number;
}
