import { Browser } from './Browser';
import { OsType } from './Enum';
import { CollectionBasicQueryParams, CollectionQueryParams, CollectionResponse, QueryParams } from './HTTP';
import { TestRunsQueryParams } from './TestRun';
export declare enum DeviceGroupOrigin {
    STATIC = "STATIC",
    DYNAMIC = "DYNAMIC",
    HYBRID = "HYBRID"
}
export declare enum Platform {
    IOS = "IOS",
    ANDROID = "ANDROID",
    WINDOWS = "WINDOWS",
    MAC = "MAC",
    LINUX = "LINUX",
    UNDEFINED = "UNDEFINED"
}
export declare enum SupportedCreators {
    MANUAL = "MANUAL",
    ROBOT = "ROBOT",
    AUTOMATIC = "AUTOMATIC"
}
export declare type DeviceProperty = {
    displayName: string;
    id: number;
    labelGroupName: string;
    name: string;
    propertyGroupId: number;
    propertyGroupName: string;
};
export declare type SoftwareVersion = {
    apiLevel: number;
    id: number;
    releaseVersion: string;
};
export declare type Device = {
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
    mainUserEmail: string;
    manufacturer: string;
    online: boolean;
    osType: OsType;
    platform: Platform;
    properties: CollectionResponse<DeviceProperty>;
    softwareVersion: SoftwareVersion;
    supportedCreators: SupportedCreators;
};
export declare type DeviceCleanupConfiguration = {
    content: string;
    createTime: number;
    createdByEmail: string;
    createdById: number;
    discriminator: string;
    enabled: boolean;
    global: boolean;
    example: true;
    id: number;
    lastModificationTime: number;
    osType: OsType;
};
export declare type DeviceCleanupConfigurationData = {
    deviceCleanupConfigurationId: number;
};
export declare type DeviceLabelData = {
    labelId: number;
};
export interface DeviceProperiesData extends QueryParams {
    labelId: number;
}
export declare type CleanupConfigurationData = Pick<DeviceCleanupConfiguration, 'content' | 'discriminator' | 'enabled'>;
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
    labelIds: Array<string>;
    liveTestingOnly: boolean;
    withBrowsers: boolean;
    withDedicated: boolean;
    withDisabled: boolean;
    withProperties: boolean;
    withSupportedCreators: boolean;
}
