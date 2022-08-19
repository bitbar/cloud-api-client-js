import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {Enum} from './models/Enum';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {NotificationPlan, NotificationPlanData} from './models/NotificationPlan';


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
