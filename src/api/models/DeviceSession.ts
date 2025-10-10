import {Device} from './Device';
import {CollectionBasicQueryParams} from './HTTP';

export type TunnelSettings = {
  domain: string;
  email: string;
}

export enum DeviceSessionType {
  AUTOMATIC = 'AUTOMATIC',
  MANUAL_APP = 'MANUAL_APP',
  MANUAL_WEB = 'MANUAL_WEB'
}

export enum RetryState {
  NONE = 'NONE',
  MANUAL = 'MANUAL',
  AUTO = 'AUTO'
}

export enum DeviceSessionState {
  ABORTED = 'ABORTED',
  EXCLUDED = 'EXCLUDED',
  FAILED = 'FAILED',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  TIMEOUT = 'TIMEOUT',
  WAITING = 'WAITING',
  WARNING = 'WARNING'
}

export enum DeviceSessionStepType {
  WAITING = 'WAITING',
  PREPARING = 'PREPARING',
  UNINSTALL = 'UNINSTALL',
  INSTALL = 'INSTALL',
  RUNNING = 'RUNNING',
  SENDING_RESULTS = 'SENDING_RESULTS',
  PROCESSING_RESULTS = 'PROCESSING_RESULTS'
}

export type DeviceSessionConfig = {
  adbVersion: string;
  browserName: string;
  browserVersion: string;
  deviceModelId: number;
  id: number;
  screenResolution: string;
  tunnelSettings: TunnelSettings;
  type: DeviceSessionConfig;
  url: string;
}

export type DeviceSession = {
  accountId: number;
  autoRetriesLeftCount: number;
  biometricInstrumentation: boolean;
  config: DeviceSessionConfig;
  createTime: number;
  clientSideId: string;
  device: Device;
  deviceInstanceId: number;
  deviceLogFirstTimestamp: number;
  deviceRunId: number;
  duration: number;
  endTime: number;
  excludeReason: string;
  externalId: string;
  id: number;
  installTime: number;
  name: string;
  projectId: number;
  projectName: string;
  retryable: boolean;
  retryState: RetryState;
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
  uiLink: string;
  userEmail: string;
  userId: number;
}

export type DeviceSessionCommand = {
  duration: number;
  httpMethod: string;
  id: number;
  requestBody: string;
  responseBody: string;
  responseCode: number;
  timestamp: number;
  uri: string;
}

export type DeviceSessionStep = {
  deviceSessionId: number;
  excludeReason: string;
  failReason: string;
  finishTimeMS: number;
  id: number;
  startTimeMS: number;
  type: DeviceSessionStepType;
}

export type DeviceSessionConnection = {
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
  urlSchema: string;
}

export type DeviceSessionData = Omit<DeviceSessionConfig, 'adbVersion' | 'id' | 'tunnelSettings' | 'type'> & {configuration: DeviceSessionConfig};

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

export interface TestRunDeviceSessionQueryParams extends CollectionBasicQueryParams {
  projectId: number;
}

export enum SessionReleaseReason {
  INACTIVITY = 'INACTIVITY',
  TIMEOUT = 'TIMEOUT',
  USER_ACTION = 'USER_ACTION',
  CHANGE_DEVICE = 'CHANGE_DEVICE',
  WEBSOCKET_CLOSED = 'WEBSOCKET_CLOSED'
}

export type DeviceSessionRelease = {
  reason: SessionReleaseReason;
}
