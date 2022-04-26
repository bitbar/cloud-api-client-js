import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'


/**
 * APIAdminResourceCluster
 *
 * @class
 * @extends APIResource
 */
export class APIAdminResourceCluster extends APIResource {

  /**
   * /clusters/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('clusters', id);
  }

  // /clusters/{id}/devices
  devices () {
    return new APIList(this).push('devices');
  }

}

export default APIAdminResourceCluster
