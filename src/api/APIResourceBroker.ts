import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'
import {APIResource} from './APIResource'

/**
 * APIResourceBroker
 *
 * @class
 * @extends APIResource
 */
export class APIResourceBroker extends APIResource {

  /**
   * Endpoint: /broker
   */
  constructor(parent: APIEntity<any> | API) {

    super(parent);
    this.push('broker');
  }

  // /broker/hubs
  public hubs() {
    return new APIList(this).push('hubs');
  }

}

export default APIResourceBroker
