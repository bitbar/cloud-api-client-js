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
    return new APIList(this).push('available');
  }

  public active () {
    const a = new APIList(this);
    if (this.stack[0] === 'me') {
      a.push('active');
    } else {
      a.params({
        notArchived: true
      });
    }
    return a;
  }

}

export default APIListServices
