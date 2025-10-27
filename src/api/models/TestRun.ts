import {Device} from './Device';
import {TunnelSettings} from './DeviceSession';
import {OsType} from './Enum';
import {CollectionBasicQueryParams, QueryParams} from './HTTP';
import {UserFile} from './UserFile';
import {DeviceGroup} from './DeviceGroup';
import {Framework} from './Framework';


export enum LimitationType {
  PACKAGE = 'PACKAGE',
  CLASS = 'CLASS'
}

export enum TestScheduler {
  PARALLEL = 'PARALLEL',
  SERIAL = 'SERIAL',
  SINGLE = 'SINGLE',
  ALL_INSTANCES = 'ALL_INSTANCES'
}

export enum TestState {
  WAITING = 'WAITING',
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED'
}


export type TestRun = {
  abortedDeviceCount: number;
  config: TestRunConfig;
  createTime: number;
  deviceCount: number;
  displayName: string;
  errorsDeviceCount: number;
  excludedDeviceCount: number;
  executedTestCaseCount: number;
  executionRatio: number;
  failedTestCaseCount: number;
  finishedDeviceCount: number;
  frameworkId: number;
  frameworkName: string;
  id: number;
  logsFileId: number;
  message: string;
  'number': number;
  projectId: number;
  projectName: string;
  rowIndex: number;
  runningDeviceCount: number;
  screenshotsFileId: number;
  startTime: number;
  startedByDisplayName: string;
  startedById: number;
  state: TestState;
  succeededDeviceCount: number;
  successRatio: number;
  successfulTestCaseCount: number;
  testCaseCount: number;
  timeoutedDeviceCount: number;
  uiLink: string;
  userId: number;
  waitingDeviceCount: number;
  warningDeviceCount: number;
}

export enum TestRunConfigFileAction {
  COPY_TO_DEVICE = 'COPY_TO_DEVICE',
  INSTALL = 'INSTALL',
  RUN_TEST = 'RUN_TEST',
}

export type TestRunConfigFile = {
  action: TestRunConfigFileAction;
  availableActions: Array<TestRunConfigFileAction>;
  file: UserFile;
  id: number;
};

export type TestRunParameter = {
  name?: string;
  key: string;
  value: string;
  label?: string;
}

export type TRCDefaultSettings = {
  deviceLanguageCode: string;
  disableResigning: boolean;
  hookURL: string;
  instrumentationRunner: string;
  limitationType: string;
  limitationValue: string;
  scheduler: string;
  screenshotDir: string;
  withAnnotation: string;
  withoutAnnotation: string;
  timeout: string;
  projectName: string;
  testRunName: string;
  testRunParameters?: TestRunParameter[];
  biometricInstrumentation: boolean;
}

export type TestRunConfig = TRCDefaultSettings & {
  appCrawlerRun: boolean;
  appiumBrokerAddress: string;
  appiumBrokerQueueName: string;
  applicationPassword: string;
  applicationUsername: string;
  availableDeviceGroups: DeviceGroup[];
  availableDevices: Array<Device>;
  availableFrameworks: Framework[];
  availableOsTypes: Array<OsType>;
  clientSideTestConfig: any;
  computedDevices: Array<number>;
  creditsPrice: number;
  deviceGroupId?: number;
  deviceIds: any;
  deviceNamePattern: string;
  files: Array<TestRunConfigFile> | null;
  frameworkId: number;
  id: number;
  loadedPrevious: boolean;
  maxAutoRetriesCount: number;
  maxTestTimeout: any;
  maxWaitTime: number;
  osType: OsType;
  projectId: number;
  resignFiles: boolean;
  runAvailable: boolean;
  status: string;
  statusCode: number;
  testRunId: number;
  testRunNameGrouping: string;
  tunnelSettings: TunnelSettings;
  useSamples: boolean;
  usedDeviceGroupId: number;
  usedDeviceGroupName: string;
  videoRecordingEnabled: boolean;
  withAnnotation: string;
}

export interface TestRunData extends QueryParams {
  displayName: string;
}

export interface RunData extends TestRunData {
  projectId: number;
}

export interface RunQueryParam extends QueryParams {
  projectId: number;
}


export type TestRunsIncludes = {
  includeDeviceGroups: boolean;
  includeDevices: boolean;
  includeFrameworks: boolean;
}

export type RunsConfigParams = TestRunsIncludes & QueryParams;

// for users/{userid}/runs
export interface TestRunsQueryParams extends CollectionBasicQueryParams {
  forWholeAccount: boolean;
  skipCommonProject: boolean;
  skipShared: boolean;
}
