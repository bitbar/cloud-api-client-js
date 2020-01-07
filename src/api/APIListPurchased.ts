import APIList from './APIList'


/**
 * APIListPurchased
 *
 * @class
 * @extends APIList
 */
class APIListPurchased extends APIList {

  /**
   * /purchased
   *
   * Constructor
   */
  constructor (parent: object) {
    super(parent);
    this.push('purchased');
  }

}

export default APIListPurchased
