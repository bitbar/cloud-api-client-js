import APIList from './APIList'
import APIListPurchased from './APIListPurchased'


/**
 * APIListServices
 *
 * @class
 * @extends APIList
 */
class APIListServices extends APIList {

  // Constructor
  constructor (parent: object) {
    super(parent);
    this.push('services');
  }

  // /services/purchased
  public purchased () {
    return new APIListPurchased(this);
  }

  // /services/available
  public available () {
    this.push('available');
  }

}

export default APIListServices
