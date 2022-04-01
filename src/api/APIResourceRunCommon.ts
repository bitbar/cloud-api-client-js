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
  public abort() {
    return new APIResource(this).push('abort').post();
  }

  // /runs/{id}/data-availability
  public dataAvailability() {
    return new APIList(this).push('data-availability');
  }

  // /runs/{id}/device-sessions
  public deviceSessions() {
    return new APIList(this).push('device-sessions');
  }

  // /runs/{id}/files.zip
  public filesZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'files.zip', ids);
  }

  // /runs/{id}/logs.zip
  public logsZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'logs.zip', ids);
  }

  // /runs/{id}/performance.zip
  public performanceZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'performance.zip', ids);
  }

  // /runs/{id}/retry
  public retry(ids?: Array<number>) {
    return postDeviceRunIds(this, 'retry', ids).setRequestConfig({
      timeout: 0
    });
  }

  // /runs/{id}/screenshot-names
  public screenshotNames() {
    return new APIList(this).push('screenshot-names');
  }

  // /runs/{id}/screenshots
  public screenshots() {
    return new APIList(this).push('screenshots');
  }

  // /runs/{id}/screenshots.zip
  public screenshotsZip(ids?: Array<number>) {
    return postDeviceRunIds(this, 'screenshots.zip', ids);
  }

  // /runs/{id}/steps
  public steps() {
    return new APIList(this).push('steps');
  }

  // /runs/{id}/tags
  public tags() {
    return new APIList(this).push('tags');
  }

  // /runs/{id}/tag
  public tag(id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('tags', id);
  }

}

export default APIResourceRunCommon
