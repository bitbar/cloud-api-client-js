import { Device } from './Device';
import { CollectionBasicQueryParams } from './HTTP';
export declare type TunnelSettings = {
    domain: string;
    email: string;
};
export declare enum DeviceSessionType {
    AUTOMATIC = "AUTOMATIC",
    MANUAL = "MANUAL",
    MANUAL_APP = "MANUAL_APP",
    MANUAL_WEB = "MANUAL_WEB",
    REMOTE = "REMOTE"
}
export declare enum RetryState {
    NONE = "NONE",
    MANUAL = "MANUAL",
    AUTO = "AUTO"
}
export declare enum DeviceSessionState {
    ABORTED = "ABORTED",
    EXCLUDED = "EXCLUDED",
    FAILED = "FAILED",
    RUNNING = "RUNNING",
    SUCCEEDED = "SUCCEEDED",
    TIMEOUT = "TIMEOUT",
    WAITING = "WAITING",
    WARNING = "WARNING"
}
export declare enum DeviceSessionStepType {
    WAITING = "WAITING",
    PREPARING = "PREPARING",
    UNINSTALL = "UNINSTALL",
    INSTALL = "INSTALL",
    RUNNING = "RUNNING",
    SENDING_RESULTS = "SENDING_RESULTS",
    PROCESSING_RESULTS = "PROCESSING_RESULTS"
}
export declare type DeviceSessionConfig = {
    adbVersion: string;
    browserName: string;
    browserVersion: string;
    deviceModelId: number;
    id: number;
    screenResolution: string;
    tunnelSettings: TunnelSettings;
    type: DeviceSessionConfig;
    url: string;
};
export declare type DeviceSession = {
    accountId: number;
    autoRetriesLeftCount: number;
    billable: boolean;
    config: DeviceSessionConfig;
    createTime: number;
    clientSideId: string;
    device: Device;
    deviceInstanceId: number;
    deviceLogFirstTimestamp: number;
    deviceRunId: number;
    deviceTime: number;
    duration: number;
    endTime: number;
    excludeReason: string;
    externalId: string;
    id: number;
    installTime: number;
    name: string;
    projectId: number;
    projectName: string;
    retryState: RetryState;
    rowIndex: number;
    startTime: number;
    state: DeviceSessionState;
    successRatio: number;
    testCaseAllCount: number;
    testCaseFailedCount: number;
    testCasePassedCount: number;
    testCaseSkippedCount: number;
    testCaseSuccessCount: number;
    testRunId: number;
    testRunName: string;
    timeLimit: number;
    type: DeviceSessionType;
    userEmail: string;
    userId: number;
};
export declare type DeviceSessionCommand = {
    duration: number;
    httpMethod: string;
    id: number;
    requestBody: string;
    responseBody: string;
    responseCode: number;
    timestamp: number;
    uri: string;
};
export declare type DeviceSessionStep = {
    deviceSessionId: number;
    excludeReason: string;
    failReason: string;
    finishTimeMS: number;
    id: number;
    startTimeMS: number;
    type: DeviceSessionStepType;
};
export declare type DeviceSessionConnection = {
    createTime: number;
    deviceSessionId: number;
    endTime: number;
    externalId: string;
    host: string;
    id: number;
    password: string;
    path: string;
    port: number;
    type: string;
    url: string;
    urlSchema: string;
};
export declare type DeviceSessionData = Omit<DeviceSessionConfig, 'adbVersion' | 'id' | 'tunnelSettings' | 'type'> & {
    configuration: DeviceSessionConfig;
};
export interface DeviceSessionQueryParams extends CollectionBasicQueryParams {
    withProperties: boolean;
}
export interface SessionQueryParams extends CollectionBasicQueryParams {
    projectId: number;
    testRunId: number;
}
export interface SessionRunStepQueryParams extends CollectionBasicQueryParams {
    runId: number;
}
export interface SessionStepQueryParams extends SessionRunStepQueryParams {
    projectId: number;
}
export interface TRunDeviceSessionQueryParams extends CollectionBasicQueryParams {
    projectId: number;
}
export declare type DeviceSessionRelease = {
    reason: string;
};
