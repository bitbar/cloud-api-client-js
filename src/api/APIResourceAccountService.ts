import APIResource from './APIResource'

/**
 * APIResourceAccountService
 *
 * @class
 * @extends APIResource
 */
class APIResourceAccountService extends APIResource {

  /**
   * /account-services/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('account-services', id);
  }

  // /account-services/{id}/billing-period
  public billingPeriod () {
    return new APIResource(this).push('billing-period');
  }

}

export default APIResourceAccountService
