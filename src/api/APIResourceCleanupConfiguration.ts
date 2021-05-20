import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIResourceCleanupConfiguration
 *
 * @class
 * @extends APIResource
 */
class APIResourceCleanupConfiguration extends APIResource {

  /**
   * /cleanup-configurations/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('cleanup-configurations', id);
  }

  // /cleanup-configurations/specific
  public devices () {
    return new APIList(this).push('devices');
  }

}

export default APIResourceCleanupConfiguration
