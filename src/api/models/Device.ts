import {Browser} from './Browser';
import {OsType} from './Enum';
import {CollectionBasicQueryParams, CollectionQueryParams, CollectionResponse, QueryParams} from './HTTP';
import {TestRunsQueryParams} from './TestRun';


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

export enum PoolSize {
  XL= 'XL',
  L = 'L',
  M = 'M',
  S = 'S'
}

export enum Code {
  HIGH = 'HIGH',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
  NONE = 'NONE',
}

export type DeviceAvailability = {
  poolSize: PoolSize,
  code: Code
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

export enum LockReason {
  TESTING = 'TESTING',
  CLEANING = 'CLEANING',
  NOT_OPERATIONAL = 'NOT_OPERATIONAL'
}

export type Device = {
  accountId: number;
  accountName: string;
  available: boolean;
  availability: DeviceAvailability;
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
  imageCornerRadius: number;
  imageHeight: number;
  imageLeft: number;
  imagePrefix: string;
  imageTop: number;
  imageWidth: number;
  locked: boolean;
  lockReason: LockReason;
  manufacturer: string;
  online: boolean;
  osType: OsType;
  platform: Platform;
  properties: CollectionResponse<DeviceProperty>;
  softwareVersion: SoftwareVersion;
  supportedCreators: Array<SupportedCreators>;
}

export type DeviceCleanupConfiguration = {
  content: string;
  createTime: number;
  createdByEmail: string;
  createdById: number;
  description: string;
  name: string;
  enabled: boolean;
  global: boolean;
  example: true;
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

export interface DeviceProperiesData extends QueryParams {
  labelId: number;
}

export interface CleanupConfigurationSpecificData extends QueryParams {
  serialId: string;
}

export interface DeviceTimeSummaryQueryParams extends CollectionBasicQueryParams {
  forWholeAccount: boolean;
}
export interface DeviceUsageQueryParams extends TestRunsQueryParams {
  startTime: number;
}

export interface DeviceStatisticQueryParam extends TestRunsQueryParams {
  mode: string;
}

export interface DevicesQueryParams extends CollectionQueryParams {
  labelIds: Array<number>;
  liveTestingOnly: boolean;
  withBrowsers: boolean;
  withDedicated: boolean;
  withDisabled: boolean;
  withProperties: boolean;
  withSupportedCreators: boolean;
}
