import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIList} from './APIList'

/**
 * APIListNotifications
 *
 * @class
 * @extends APIList
 */
export class APIListNotifications extends APIList {

  /**
   * /notifications
   * Constructor
   */
  constructor(parent: APIEntity<any> | API) {
    super(parent);
    this.push('notifications');
  }

  // /notifications/scopes
  public scopes() {
    return new APIList(this).push('scopes');
  }

  // /notifications/channels
  public channels() {
    return new APIList(this).push('channels');
  }

}

export default APIListNotifications
