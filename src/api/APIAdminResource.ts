import APIEntity from './APIEntity'

import APIList from './APIList'

import APIResource from './APIResource'
import APIResourceFile from './APIResourceFile'


/**
 * APIAdminResource
 *
 * @class
 * @extends APIResource
 */
class APIAdminResource extends APIResource {

  /**
   * /admin
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
  }


  // /device-status
  public deviceStatuses () {
    return new APIList(this).push('device-status');
  }

  // /files
  public files () {
    return new APIList(this).push('files');
  }

  // /files/{id}
  public file (id: number) {
    return new APIResourceFile(this, id);
  }

  // /runs
  public runs () {
    return new APIList(this).push('runs');
  }

  // /projects
  public projects () {
    return new APIList(this).push('projects');
  }

}

export default APIAdminResource
