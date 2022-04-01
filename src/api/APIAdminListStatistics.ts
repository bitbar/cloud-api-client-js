import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'


/**
 * APIAdminListStatistics
 *
 * @class
 * @extends APIList
 */
export class APIAdminListStatistics extends APIList {

  /**
   * /statistics
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'statistics');
  }

  // /statistics/device-sessions
  public deviceSessions () {
    return new APIList(this).push('device-sessions');
  }

  // /statistics/frameworks
  public frameworks () {
    return new APIList(this).push('frameworks');
  }


}


export default APIAdminListStatistics
