import APIResource from './APIResource'
import APIList from './APIList'


/**
 * APIListCleanupConfigurations
 *
 * @class
 * @extends APIResource
 */
class APIListCleanupConfigurations extends APIList {

  /**
   * /builds/{id}
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('cleanup-configurations');
  }

  // /cleanup-configurations/specific
  public specific () {
    return new APIResource(this).push('specific');
  }

}

export default APIListCleanupConfigurations
