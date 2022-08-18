import {NoData} from './APIEntity';
import {APIList} from './APIList'
import {APIResourceUser} from './APIResourceUser';
import {Enum} from './models/Enum';
import {CollectionQueryParams, NoQueryParams} from './models/HTTP';
import {Notification} from './models/Notification';

export type NotificationData = Pick<Notification, 'channel' | 'destination' | 'projectId' | 'scope'>;

export class APIListNotifications extends APIList<Notification, CollectionQueryParams, NotificationData> {

  /**
   * /notifications
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('notifications');
  }

  // /notifications/scopes
  scopes() {
    return new APIList<Enum, NoQueryParams, NoData>(this).push('scopes');
  }

  // /notifications/channels
  channels() {
    return new APIList<Enum, NoQueryParams, NoData>(this).push('channels');
  }

}

export default APIListNotifications
