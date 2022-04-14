import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource'
import {InputFileset} from './class/InputFileset'
import {OutputFileset} from './class/OutputFileset'
import {DeviceSessionCommon} from './interface/DeviceSessionCommon';


/**
 * APIResourceDeviceSession
 *
 * @class
 * @extends APIResource
 */
export class APIResourceDeviceSessionCommon extends APIResource implements DeviceSessionCommon {

  /**
   * /device-sessions/{id}
   *
   * Constructor
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
    return new APIList(this).push('commands');
  }

  // /device-sessions/{id}/input-file-set
  input() {
    return new InputFileset(this);
  }

  // /device-sessions/{id}/output-file-set
  output() {
    return new OutputFileset(this);
  }

  // /device-sessions/{id}/screenshots
  screenshots() {
    return new APIList(this).push('screenshots');
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
    return new APIList(this).push('steps');
  }

  // /device-sessions/{id}/steps/{id}
  step(id: number | 'current') {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('steps', id);
  }

  // /device-sessions/{id}/steps/current
  currentStep() {
    return this.step('current');
  }

  // /device-sessions/{id}/test-case-runs
  testCaseRuns() {
    return new APIList(this).push('test-case-runs');
  }

}

export default APIResourceDeviceSessionCommon
