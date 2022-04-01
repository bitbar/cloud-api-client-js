import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'


/**
 * APIListDeviceTime
 *
 * @class
 * @extends APIList
 */
export class APIListDeviceTime extends APIList {

  /**
   * /device-time
   *
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('device-time');
  }

  // /device-time/reserved
  public reserved () {
    return new APIList(this).push('reserved');
  }

  // /device-time/used
  public used () {
    return new APIList(this).push('used');
  }

}

export default APIListDeviceTime;
