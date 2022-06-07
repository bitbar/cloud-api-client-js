import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {Enum} from "./models/Enum";
import {NotificationPlan} from "./models/NotificationPlan";


export class APIAdminListNotificationPlans extends APIList<NotificationPlan> {

  /**
   * /admin/notification-plans
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'notification-plans');
  }

  // /notification-plans/channels
  channels() {
    return new APIList<Enum>(this).push('channels');
  }

  // /notification-plans/scopes
  scopes() {
    return new APIList<Enum>(this).push('scopes');
  }

}


export default APIAdminListNotificationPlans
