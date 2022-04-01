import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {APIResourceBuild} from './APIResourceBuild'


/**
 * APIResourceFile
 *
 * @class
 * @extends APIResource
 */
export class APIResourceJob extends APIResource {

  /**
   * /jobs/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('jobs', id);
  }

  // /jobs/{id}/builds
  public builds() {
    return new APIList(this).push('builds');
  }

  // /jobs/{id}/builds/{id}
  public build(id: number) {
    return new APIResourceBuild(this, id);
  }

}

export default APIResourceJob
