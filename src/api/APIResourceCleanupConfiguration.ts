import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIResourceCleanupConfiguration
 *
 * @class
 * @extends APIResource
 */
export class APIResourceCleanupConfiguration extends APIResource {

  /**
   * /cleanup-configurations/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('cleanup-configurations', id);
  }

  // /cleanup-configurations/specific
  devices() {
    return new APIList(this).push('devices');
  }

}

export default APIResourceCleanupConfiguration
