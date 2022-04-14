import {APIList} from './APIList'
import APIListUsers from "./APIListUsers";
import APIResourceUser from "./APIResourceUser";
import {Enum} from "./models/Enum";
import {Notification} from "./models/Notification";


export class APIListNotifications extends APIList<Notification> {

  /**
   * /notifications
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('notifications');
  }

  // /notifications/scopes
  scopes(): APIList<Enum> {
    return new APIList(this).push('scopes');
  }

  // /notifications/channels
  channels(): APIList<Enum> {
    return new APIList(this).push('channels');
  }

}

export default APIListNotifications
