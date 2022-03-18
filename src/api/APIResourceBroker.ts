import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceBroker
 *
 * @class
 * @extends APIResource
 */
class APIResourceBroker extends APIResource {

  /**
   * Endpoint: /broker
   */
  constructor (parent: object) {

    super(parent);
    this.push('broker');
  }

  // /broker/hubs
  public hubs () {
    return new APIList(this).push('hubs');
  }

}

export default APIResourceBroker
