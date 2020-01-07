import APIResource from './APIResource'
import APIList from './APIList'

import FilterBuilder from '../FilterBuilder'


// Create non-media files filter
const NON_MEDIA_FILES_FILTER = new FilterBuilder();
NON_MEDIA_FILES_FILTER.eq('state', 'READY');
NON_MEDIA_FILES_FILTER.notin('mimetype', [
  // no images
  'image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif',

  // no videos
  'video/mp4', 'video/avi', 'video/webm', 'video/ogg', 'video/mpeg'
]);


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


/**
 * InputFileset
 *
 * @class
 * @extends APIResource
 */
class InputFileset extends APIResource {

  /**
   * /input-file-set
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('input-file-set');
  }

  // /input-file-set/files
  public files () {
    return new APIList(this).push('files');
  }

  // /input-file-set/files.zip
  public filesZip () {
    return new APIResource(this).push('files.zip');
  }
}


/**
 * OutputFileset
 *
 * @class
 * @extends APIResource
 */
class OutputFileset extends APIResource {

  /**
   * /output-file-set
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('output-file-set');
  }

  // /output-file-set/files
  public files () {
    return new APIList(this).push('files');
  }

  // /output-file-set/files.zip
  public filesZip () {
    return new APIResource(this).push('files.zip');
  }

  // /output-file-set/screenshots
  public screenshots () {
    return new APIList(this).push('screenshots');
  }

  // /output-file-set/screenshots/{id}
  public screenshot (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('screenshots', id);
  }

  // /output-file-set/screenshots/{id}/file/{id}
  public screenshotFile (id: number) {
    this.screenshot(id).push('file');
  }

  // Filter files out by ready videos
  public videos () {
    this.files().params({
      filter: 's_state_eq_READY',
      tag: ['video']
    });
  }

  // Filter files out by non-media
  nonMediaFiles () {
    return this.files().filter(NON_MEDIA_FILES_FILTER);
  }

}

export default APIResourceDeviceSession
