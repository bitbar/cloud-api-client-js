import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {postDeviceRunIds} from './factory/postDeviceRunIds';

/**
 * APIResourceRun
 *
 * @class
 * @extends APIResource
 */
export class APIResourceRunCommon extends APIResource {

  /**
   * /runs/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('runs', id);
  }

  // /runs/{id}/abort
  abort() {
    return new APIResource(this).push('abort').post();
  }

  // /runs/{id}/data-availability
  dataAvailability() {
    return new APIList(this).push('data-availability');
  }

  // /runs/{id}/device-sessions
  deviceSessions() {
    return new APIList(this).push('device-sessions');
  }

  // /runs/{id}/files.zip
  filesZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'files.zip', ids);
  }

  // /runs/{id}/logs.zip
  logsZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'logs.zip', ids);
  }

  // /runs/{id}/performance.zip
  performanceZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'performance.zip', ids);
  }

  // /runs/{id}/retry
  retry(ids?: Array<number>) {
    return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

  // /runs/{id}/screenshot-names
  screenshotNames() {
    return new APIList(this).push('screenshot-names');
  }

  // /runs/{id}/screenshots
  screenshots() {
    return new APIList(this).push('screenshots');
  }

  // /runs/{id}/screenshots.zip
  screenshotsZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'screenshots.zip', ids);
  }

  // /runs/{id}/steps
  steps() {
    return new APIList(this).push('steps');
  }

  // /runs/{id}/tags
  tags() {
    return new APIList(this).push('tags');
  }

  // /runs/{id}/tag
  tag(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('tags', id);
  }

}

export default APIResourceRunCommon
