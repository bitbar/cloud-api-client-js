import {CollectionResponse} from "../APIList";
import {Browser} from "./Browser";
import {OsType} from "./Enum";

export type DeviceProperty = {
  displayName: string;
  id: number;
  labelGroupName: string;
  name: string;
  propertyGroupId: number;
  propertyGroupName: string;
  selfURI: string;
}

export type SoftwareVersion = {
  apiLevel: number;
  id: number;
  releaseVersion: string;
  selfURI: string;
}

export type Device = {
  accountId: number;
  available: boolean;
  browsers: CollectionResponse<Browser>;
  creditsPrice: number;
  deviceGroupOrigin: 'STATIC' | 'DYNAMIC' | 'HYBRID';
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
  platform: 'IOS'| 'ANDROID' | 'WINDOWS' | 'MAC' | 'LINUX' | 'UNDEFINED';
  properties: CollectionResponse<DeviceProperty>;
  selfURI: string;
  softwareVersion: SoftwareVersion;
  supportedCreators: 'MANUAL' | 'ROBOT' | 'AUTOMATIC';
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
  selfURI: string;
}
