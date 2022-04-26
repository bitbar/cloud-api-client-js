import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

/**
 * APIListSmartbearTunnels
 *
 * @class
 * @extends APIList
 */
export class APIListSmartbearTunnels extends APIList {

  /**
   * /tunnels
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('tunnels');
  }

  /**
   * Sets tunnel activity parameter
   *
   * @public
   * @param {number} active - fetching active or inactive tunnels
   * @returns this
   */
  active(active: boolean) {
    return this.params({active: active});
  }
}

export default APIListSmartbearTunnels;
