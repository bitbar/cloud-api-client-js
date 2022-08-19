import {APIList} from './APIList';
import {APIResourceChannel} from './APIResourceChannel';
import {APIResourceUser} from './APIResourceUser';
import {Enum} from './models/Enum';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {Notification, NotificationsData} from './models/Notification';


export class APIListNotifications extends APIList<Notification, CollectionQueryParams, NotificationsData> {

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

  channel(type: string) {
    return new APIResourceChannel(this, type);
  }

}

export default APIListNotifications
