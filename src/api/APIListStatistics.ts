import APIList from './APIList'


/**
 * APIListStatistics
 *
 * @class
 * @extends APIList
 */
class APIListStatistics extends APIList {

  // Constructor
  constructor (parent: object) {
    super(parent);
    this.push('statistics');
  }

  // /statistics/device-sessions
  public deviceSessions () {
    return new APIList(this).push('device-sessions');
  }

}

export default APIListStatistics
