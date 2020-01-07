import APIList from './APIList'


/**
 * APIListNotifications
 *
 * @class
 * @extends APIList
 */
class APIListNotifications extends APIList {

  /**
   * /notifications
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('notifications');
  }

  // /notifications/scopes
  public scopes () {
    return new APIList(this).push('scopes');
  }

  // /notifications/channels
  public channels () {
    return new APIList(this).push('channels');
  }

}

export default APIListNotifications
