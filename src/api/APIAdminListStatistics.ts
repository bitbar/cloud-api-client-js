import APIList from './APIList'


/**
 * APIAdminListStatistics
 *
 * @class
 * @extends APIList
 */
class APIAdminListStatistics extends APIList {

  /**
   * /statistics
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('admin', 'statistics');
  }

  // /statistics/device-sessions
  public deviceSessions () {
    return new APIList(this).push('device-sessions');
  }

  // /statistics/frameworks
  public frameworks () {
    return new APIList(this).push('frameworks');
  }


}


export default APIAdminListStatistics
