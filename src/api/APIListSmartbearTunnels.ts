import APIList from './APIList'

/**
 * APIListSmartbearTunnels
 *
 * @class
 * @extends APIList
 */
class APIListSmartbearTunnels extends APIList {

  /**
   * /tunnels
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('tunnels');
  }

  /**
   * Sets tunnel activity parameter
   *
   * @public
   * @param {number} active - fetching active or inactive tunnels
   * @returns this
   */
  public active (active: boolean) {
    return this.params({ active: active });
  }
}

export default APIListSmartbearTunnels;
