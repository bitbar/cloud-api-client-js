import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

/**
 * APIListStatistics
 *
 * @class
 * @extends APIList
 */
export class APIListStatistics extends APIList {

  // Constructor
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('statistics');
  }

  // /statistics/device-sessions
  deviceSessions() {
    return new APIList(this).push('device-sessions');
  }

}

export default APIListStatistics
