import {APIAdminResource} from './APIAdminResource';
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {NoData, NoQueryParams} from './models/HTTP';
import {Notification} from './models/Notification';
import {NotificationPlan, NotificationPlanEditData} from './models/NotificationPlan';

export class APIAdminResourceNotificationPlan extends APIResource<NotificationPlan, NoQueryParams, NotificationPlanEditData> {

  /**
   * /admin/notification-plans/{id}
   */
  constructor(parent: APIAdminResource, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('admin', 'notification-plans', id);
  }

  // /admin/notification-plans/{id}/check
  check() {
    return new APIList<Notification>(this).push('check');
  }

  // /admin/notification-plans/{id}/test
  test() {
    return new APIResource<NotificationPlan, NoQueryParams, NoData>(this).push('test');
  }

  // /admin/notification-plans/{id}/execute
  execute() {
    return new APIResource<NotificationPlan, NoQueryParams, NoData>(this).push('execute');
  }

}

export default APIAdminResourceNotificationPlan
