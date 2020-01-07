import APIResource from './APIResource'
import APIResourceDeviceSession from './APIResourceDeviceSession'

import APIList from './APIList'


/**
 * APIResourceRun
 *
 * @class
 * @extends APIResource
 */
class APIResourceRun extends APIResource {

  /**
   * /runs/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('runs', id);
  }

  // /runs/{id}/config
  public config () {
    return new APIResource(this).push('config');
  }

  // /runs/{id}/device-sessions
  public deviceSessions () {
    return new APIList(this).push('device-sessions');
  }

  // /runs/{id}/device-sessions/{id}
  public deviceSession (id: number) {
    return new APIResourceDeviceSession(this, id);
  }

  // /runs/{id}/steps
  public steps () {
    return new APIList(this).push('steps');
  }

  // /runs/{id}/files
  public files () {
    return new APIList(this).push('files');
  }

  // /runs/{id}/files.zip
  public filesZip () {
    return new APIResource(this).push('files.zip');
  }

  // /runs/{id}/tags
  public tags () {
    return new APIList(this).push('tags');
  }

  // /runs/{id}/tag
  public tag (id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    return new APIResource(this).push('tags', id);
  }

}

export default APIResourceRun
