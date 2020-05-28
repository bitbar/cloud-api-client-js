import APIResource from './APIResource'
import APIList from './APIList';

import InputFileset from './extra-class/InputFileset';
import OutputFileset from './extra-class/OutputFileset';


/**
 * APIAdminResourceDevice
 *
 * @class
 * @extends APIResource
 */
class APIAdminResourceDeviceSession extends APIResource {

  /**
   * /device-sessions/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('device-sessions', id);
  }

  // /admin/device-sessions/{id}/changebillable
  public changeBillable () {
    const a = new APIResource(this);
    a.stack.splice(a.stack.length - 2, 0, 'admin');
    return a.push('changebillable').post();
  }

  // /device-sessions/{id}/connections
  public connections () {
    return new APIList(this).push('connections');
  }

  // /device-sessions/{id}/connections/{id}
  public connection (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('connections', id);
  }

  // /device-sessions/{id}/output-file-set
  public input () {
    return new InputFileset(this);
  }

  // /device-sessions/{id}/output-file-set
  public output () {
    return new OutputFileset(this);
  }

  // /device-sessions/{id}/release
  public release () {
    return new APIResource(this).push('release').post();
  }

  // /device-sessions/{id}/screenshots
  public screenshots () {
    return new APIList(this).push('screenshots');
  }

  // /device-sessions/{id}/screenshots/{id}
  public screenshot (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('screenshots', id);
  }

  // /device-sessions/{id}/steps
  public steps () {
    return new APIList(this).push('steps');
  }

  // /device-sessions/{id}/steps/{id}
  public step (id: number | 'current') {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('steps', id);
  }

  // /device-sessions/{id}/steps/current
  public currentStep () {
    return this.step('current');
  }

  // /device-sessions/{id}/test-case-runs
  public testCaseRuns () {
    return new APIList(this).push('test-case-runs');
  }

}

export default APIAdminResourceDeviceSession
