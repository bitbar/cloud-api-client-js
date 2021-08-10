import APIList from './APIList'


/**
 * APIListNotificationPlans
 *
 * @class
 * @extends APIList
 */
class APIAdminListNotificationPlans extends APIList {

  /**
   * /notification-plans
   * Constructor
   */
  constructor (parent: object) {
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
