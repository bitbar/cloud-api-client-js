
import {NoData} from './APIEntity';
import {APIResource} from './APIResource'
import APIResourceUser from './APIResourceUser';
import {NoQueryParams} from './models/HTTP';
import {Message} from './models/Message';
import {Notification, NotificationData} from './models/Notification';

export class APIResourceNotification extends APIResource<Notification, NoQueryParams, NotificationData> {

  /**
   * /notifications/{id}
   */
  constructor(parent: APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('notifications', id);
  }

  // /notifications/{id}/test
  test() {
    return new APIResource<Message, NoQueryParams, NoData>(this).push('test');
  }

}

export default APIResourceNotification
