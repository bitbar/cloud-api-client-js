import {API} from '../API';
import {APIEntity} from './APIEntity';
import {NoQueryParams} from './APIList';
import {APIResource} from './APIResource'
import {BillingPeriod} from './models/BillingPeriod';

export class APIResourceBillingPeriod extends APIResource<BillingPeriod, NoQueryParams, void> {

  /**
   * /billing-periods/{id}
   */
  constructor(parent: APIEntity<any> | API, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('billing-periods', id);
  }

  // /billing-periods/{id}/receipt
  receipt() {
    return new APIResource<void, NoQueryParams, void>(this).push('receipt').setRequestConfig({
      responseType: 'arraybuffer'
    });
  }

}

export default APIResourceBillingPeriod
