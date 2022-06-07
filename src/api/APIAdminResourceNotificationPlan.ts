import APIAdminResource from "./APIAdminResource";
import {APIList} from './APIList'
import {APIResource} from './APIResource'
import {Notification} from "./models/Notification";
import {NotificationPlan} from "./models/NotificationPlan";

export class APIAdminResourceNotificationPlan extends APIResource<NotificationPlan> {

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
    return new APIResource<NotificationPlan>(this).push('test');
  }

  // /admin/notification-plans/{id}/execute
  execute() {
    return new APIResource<NotificationPlan>(this).push('execute');
  }

}

export default APIAdminResourceNotificationPlan
