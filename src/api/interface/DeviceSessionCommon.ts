import {APIList} from '../APIList';
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
  step(id: number | 'current'): APIResource<DeviceSessionStep>;
  currentStep(): APIResource<DeviceSessionStep>;
  testCaseRuns(): APIList<TestCaseRun>;
}

export default DeviceSessionCommon;
