import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


/**
 * APIListCleanupConfigurations
 *
 * @class
 * @extends APIList
 */
export class APIListCleanupConfigurations extends APIList {

  /**
   * /builds/{id}
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('cleanup-configurations');
  }

  // /cleanup-configurations/specific
  public specific () {
    return new APIResource(this).push('specific');
  }

}

export default APIListCleanupConfigurations
