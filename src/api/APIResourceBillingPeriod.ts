import APIResource from './APIResource'


/**
 * APIResourceBillingPeriod
 *
 * @class
 * @extends APIResource
 */
class APIResourceBillingPeriod extends APIResource {

  /**
   * /billing-periods/{id}
   *
   * Constructor
   */
  constructor (parent: object, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('billing-periods', id);
  }

  // /billing-periods/{id}/receipt
  public receipt () {
    return new APIResource(this).push('receipt').setRequestConfig({
      responseType: 'arraybuffer'
    });
  }

}

export default APIResourceBillingPeriod
