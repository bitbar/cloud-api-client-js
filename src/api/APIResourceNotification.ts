import {API} from '../API';
import {APIEntity} from './APIEntity';
import {NoQueryParams} from './APIList';
import {APIResource} from './APIResource'
import {QueryParams} from './models/HTTP';
import {Message} from './models/Massage';
import {Notification} from './models/Notification';

enum NotificationScope {
  ALL = 'ALL',
  TEST_RUN = 'TEST_RUN',
  TEST_RUN_FAILURE = 'TEST_RUN_FAILURE',
  TEST_RUN_SUCCEEDED = 'TEST_RUN_SUCCEEDED',
  MAINTENANCE = 'MAINTENANCE',
  MAINTENANCE_RELEASE = 'MAINTENANCE_RELEASE',
  CUSTOM = 'CUSTOM',
  NEWS = 'NEWS',
  SYSTEM = 'SYSTEM',
  CHECK = 'CHECK',
  PLAN_LIMIT_REACHED = 'PLAN_LIMIT_REACHED',
  PLAN_INVOICE = 'PLAN_INVOICE'
}

export interface NotificationData extends QueryParams {
  scope: NotificationScope;
}

export class APIResourceNotification extends APIResource<Notification, NoQueryParams, NotificationData> {

  /**
   * /notifications/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('notifications', id);
  }

  // /notifications/{id}/test
  test() {
    return new APIResource<Message, NoQueryParams, void>(this).push('test');
  }

}

export default APIResourceNotification
