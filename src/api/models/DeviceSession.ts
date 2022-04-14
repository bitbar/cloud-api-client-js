export type TunnelSettings = {
  domain: string;
  email: string;
}

export type DeviceSessionType = 'AUTOMATIC' | 'MANUAL' | 'MANUAL_APP' | 'MANUAL_WEB' | 'REMOTE';
export type RetryState = 'NONE' | 'MANUAL' | 'AUTO';
export type DeviceSessionState = 'ABORTED' | 'EXCLUDED' | 'FAILED' | 'RUNNING' | 'SUCCEEDED' | 'TIMEOUT' | 'WAITING' | 'WARNING';

export type DeviceSessionConfig = {
  adbVersion: string;
  browserName: string;
  browserVersion: string;
  deviceModelId: number;
  id: number;
  screenResolution: string;
  selfURI: string;
  tunnelSettings: TunnelSettings;
  type: DeviceSessionConfig;
  url :string;
}

export type DeviceSession = {
  accountId: number;
  autoRetriesLeftCount: number;
  billable: boolean;
  config: DeviceSessionConfig;
  createTime: number;
  device: any;
  deviceInstanceId: number;
  deviceLogFirstTimestamp: number;
  deviceRunId: number;
  deviceTime: number;
  duration: number;
  endTime: number;
  excludeReason: string;
  externalId: string;
  id:	number;
  installTime: number;
  name: string;
  projectId: number;
  projectName: string;
  retryState:	RetryState;
  rowIndex: number;
  selfURI: string;
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
}

export type DeviceSessionCommand = {
  duration: number;
  httpMethod: string;
  id: number;
  requestBody: string;
  responseBody: string;
  responseCode: number;
  selfURI: string;
  timestamp: number;
  uri: string;
}

export type DeviceSessionStep = {
  deviceSessionId: number;
  excludeReason: string;
  failReason: string;
  finishTimeMS: number;
  id: number;
  selfURI: string;
  startTimeMS: number;
  type: 'WAITING' | 'PREPARING' | 'UNINSTALL' | 'INSTALL' | 'RUNNING' | 'SENDING_RESULTS' | 'PROCESSING_RESULTS';
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
  selfURI: string;
  type: string;
  url: string;
  urlSchema: string;
}
