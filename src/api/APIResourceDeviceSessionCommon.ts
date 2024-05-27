import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {InputFileset} from './class/InputFileset'
import {OutputFileset} from './class/OutputFileset'
import {DeviceSessionCommon} from './interface/DeviceSessionCommon';
import {
  DeviceSession,
  DeviceSessionCommand,
  DeviceSessionRelease,
  DeviceSessionStep,
  SessionQueryParams,
  SessionRunStepQueryParams,
  SessionStepQueryParams
} from './models/DeviceSession';
import {CollectionBasicQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {Screenshot} from './models/Screenshot';
import {TestCaseRun} from './models/TestCaseRun';

export class APIResourceDeviceSessionCommon extends APIResource<DeviceSession> implements DeviceSessionCommon {

  /**
   * /device-sessions/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-sessions', id);
  }

  // /device-sessions/{id}/commands
  commands() {
    return new APIList<DeviceSessionCommand>(this).push('commands');
  }

  // /device-sessions/{id}/input-file-set
  input() {
    return new InputFileset(this);
  }

  // /device-sessions/{id}/output-file-set
  output() {
    return new OutputFileset(this);
  }

  // /device-sessions/{id}/release
  release() {
    return new APIResource<DeviceSession, NoQueryParams, DeviceSessionRelease>(this).push('release').post();
  }

  // /device-sessions/{id}/screenshots
  screenshots() {
    return new APIList<Screenshot, SessionQueryParams | SessionRunStepQueryParams | SessionStepQueryParams, NoData>(this).push('screenshots');
  }

  // /device-sessions/{id}/screenshots/{id}
  screenshot(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('screenshots', id);
  }

  // /device-sessions/{id}/steps
  steps() {
    return new APIList<DeviceSessionStep, CollectionBasicQueryParams | SessionRunStepQueryParams | SessionStepQueryParams, NoData>(this).push('steps');
  }

  // /device-sessions/{id}/steps/{id}
  step(id: number | 'current') {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource<DeviceSessionStep, NoQueryParams, NoData>(this).push('steps', id);
  }

  // /device-sessions/{id}/steps/current
  currentStep() {
    return this.step('current');
  }

  // /device-sessions/{id}/test-case-runs
  testCaseRuns() {
    return new APIList<TestCaseRun, SessionQueryParams | NoQueryParams, NoData>(this).push('test-case-runs');
  }

  // /device-sessions/{id}/connections
  connections() {
    return new APIList(this).push('connections');
  }

  logs() {
    return new APIResource(this).push('logs').setRequestConfig({
      responseType: 'text'
    });
  }

  clusterLogs() {
    return new APIResource(this).push('cluster-logs').setRequestConfig({
      responseType: 'text'
    });
  }

}

export default APIResourceDeviceSessionCommon
