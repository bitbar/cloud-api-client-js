import {APIAdminResource} from "./APIAdminResource";
import {NoData} from "./APIEntity";
import {APIList, CollectionQueryParams, NoQueryParams} from './APIList'
import {Enum} from "./models/Enum";
import {NotificationPlan, NotificationPlanData} from "./models/NotificationPlan";


export class APIAdminListNotificationPlans extends APIList<NotificationPlan, CollectionQueryParams, NotificationPlanData> {

  /**
   * /admin/notification-plans
   */
  constructor(parent: APIAdminResource) {
    super(parent);
    this.push('admin', 'notification-plans');
  }

  // /notification-plans/channels
  channels() {
    return new APIList<Enum, NoQueryParams, NoData>(this).push('channels');
  }

  // /notification-plans/scopes
  scopes() {
    return new APIList<Enum, NoQueryParams, NoData>(this).push('scopes');
  }

}


export default APIAdminListNotificationPlans
