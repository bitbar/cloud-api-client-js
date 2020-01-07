import APIResource from './APIResource'
import APIResourceBuild from './APIResourceBuild'

import APIList from './APIList'


/**
 * APIResourceFile
 *
 * @class
 * @extends APIResource
 */
class APIResourceJob extends APIResource {

  /**
   * /jobs/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('jobs', id);
  }

  // /jobs/{id}/builds
  public builds () {
    return new APIList(this).push('builds');
  }

  // /jobs/{id}/builds/{id}
  public build (id: number) {
    return new APIResourceBuild(this, id);
  }

}

export default APIResourceJob
