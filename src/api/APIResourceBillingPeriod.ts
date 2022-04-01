import {API} from '../API';
import {APIEntity} from './APIEntity';
import {APIResource} from './APIResource'

/**
 * APIResourceBillingPeriod
 *
 * @class
 * @extends APIResource
 */
export class APIResourceBillingPeriod extends APIResource {

  /**
   * /billing-periods/{id}
   *
   * Constructor
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('billing-periods', id);
  }

  // /billing-periods/{id}/receipt
  public receipt() {
    return new APIResource(this).push('receipt').setRequestConfig({
      responseType: 'arraybuffer'
    });
  }

}

export default APIResourceBillingPeriod
