import {Device} from "./Device";
import {TunnelSettings} from "./DeviceSession";
import {OsType} from "./Enum";
import {Tag} from "./Tag";

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
  billable: boolean
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
  "number": number;
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
  tags: Array<Tag>;
  testCaseCount: number;
  timeoutedDeviceCount: number;
  totalDeviceCount: number;
  uiLink: string;
  userId: number;
  waitingDeviceCount: number;
  warningDeviceCount: number;
}

export type TestRunConfig = {
  appCrawlerRun: boolean;
  appiumBrokerAddress: string;
  applicationPassword: string;
  applicationUsername: string;
  availableDeviceGroups: any;
  availableDevices: Array<Device>;
  availableFrameworks: any;
  availableOsTypes: Array<OsType>;
  clientSideTestConfig: any;
  computedDevices: Array<number>;
  creditsPrice: number;
  deviceGroupId: number;
  deviceIds: any;
  deviceLanguageCode: string;
  deviceNamePattern: string;
  disableResigning: boolean;
  files: any;
  frameworkId: number;
  hookURL: string;
  id: number;
  instrumentationRunner: string;
  limitationType: LimitationType;
  limitationValue: string;
  loadedPrevious: boolean;
  example: true
  maxAutoRetriesCount: number;
  maxTestTimeout: any;
  osType: OsType;
  projectId: number;
  projectName: string;
  resignFiles: boolean;
  runAvailable: boolean;
  scheduler: TestScheduler;
  screenshotDir: string;
  status: string;
  statusCode: number;
  testRunId: number;
  testRunName: string;
  testRunNameGrouping: string;
  testRunParameters: any;
  timeout: number;
  tunnelSettings: TunnelSettings;
  useSamples: boolean;
  usedDeviceGroupId: number;
  usedDeviceGroupName: string;
  videoRecordingEnabled: boolean;
  withAnnotation: string;
  withoutAnnotation: string;
}
