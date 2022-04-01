import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'


/**
 * APIListNotificationPlans
 *
 * @class
 * @extends APIList
 */
export class APIAdminListNotificationPlans extends APIList {

  /**
   * /notification-plans
   * Constructor
   */
  constructor (parent: APIEntity<any> | API) {
    super(parent);
    this.push('admin', 'notification-plans');
  }

  // /notification-plans/channels
  public channels () {
    return new APIList(this).push('channels');
  }

  // /notification-plans/scopes
  public scopes () {
    return new APIList(this).push('scopes');
  }

}


export default APIAdminListNotificationPlans
