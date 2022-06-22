import {APIList, CollectionBasicQueryParams, NoQueryParams} from '../APIList';
import {APIResource} from '../APIResource';
import {DeviceSessionCommand, DeviceSessionStep} from "../models/DeviceSession";
import {Screenshot} from "../models/Screenshot";
import {TestCaseRun} from "../models/TestCaseRun";
import {DeviceSessionBase} from './DeviceSessionBase';

export interface DeviceSessionCommon extends DeviceSessionBase {
  commands(): APIList<DeviceSessionCommand>;
  screenshots(): APIList<Screenshot>;
  screenshot(id: number): APIResource<Screenshot>;
  steps(): APIList<DeviceSessionStep>;
  step(id: number | 'current'): APIResource<DeviceSessionStep, NoQueryParams, void>;
  currentStep(): APIResource<DeviceSessionStep, NoQueryParams, void>;
  testCaseRuns(): APIList<TestCaseRun, SessionQueryParams | NoQueryParams, void>;
}

export default DeviceSessionCommon;

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
