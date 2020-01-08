import APIResource from './APIResource'
import APIList from './APIList'

import InputFileset from './extra-class/InputFileset'
import OutputFileset from './extra-class/OutputFileset'


/**
 * APIResourceDeviceSession
 *
 * @class
 * @extends APIResource
 */
class APIResourceDeviceSession extends APIResource {

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

  // /device-sessions/{id}/cluster-logs
  public clusterLogs () {
    return new APIResource(this).push('cluster-logs');
  }

  // /device-sessions/{id}/data-availability
  public dataAvailability () {
    return new APIResource(this).push('data-availability');
  }

  // /device-sessions/{id}/fixtures.zip
  public fixturesZip () {
    return new APIResource(this).push('fixtures.zip');
  }

  // /device-sessions/{id}/junit.xml
  public junitXml () {
    return new APIResource(this).push('junit.xml');
  }

  // /device-sessions/{id}/logs
  public logs () {
    return new APIResource(this).push('logs');
  }

  // /device-sessions/{id}/performance
  public performance () {
    return new APIResource(this).push('performance');
  }

  // /device-sessions/{id}/release
  public release () {
    return new APIResource(this).push('release');
  }

  // /device-sessions/{id}/result-data.zip
  public resultDataZip () {
    return new APIResource(this).push('result-data.zip');
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

  // /device-sessions/{id}/retry
  public retry () {
    return new APIResource(this).push('retry').post();
  }

  // /device-sessions/{id}/input-file-set
  public input () {
    return new InputFileset(this);
  }

  // /device-sessions/{id}/output-file-set
  public output () {
    return new OutputFileset(this);
  }

  // Alias for output().videos();
  public videos () {
    return this.output().videos();
  }

}

export default APIResourceDeviceSession
