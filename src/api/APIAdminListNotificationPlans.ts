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
  channels () {
    return new APIList(this).push('channels');
  }

  // /notification-plans/scopes
  scopes () {
    return new APIList(this).push('scopes');
  }

}


export default APIAdminListNotificationPlans
