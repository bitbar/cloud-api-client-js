import {NoData} from './APIEntity';
import {NoQueryParams} from './APIList';
import {APIResource} from './APIResource'
import {APIResourceUser} from './APIResourceUser';
import {BillingPeriod} from './models/BillingPeriod';

export class APIResourceBillingPeriod extends APIResource<BillingPeriod, NoQueryParams, NoData> {

  /**
   * /billing-periods/{id}
   */
  constructor(parent: APIResourceUser, id: number) {
    if (id == null) {
      throw new Error('Resource ID cannot be null!');
    }

    super(parent);
    this.push('billing-periods', id);
  }

  // /billing-periods/{id}/receipt
  receipt() {
    return new APIResource<void, NoQueryParams, NoData>(this).push('receipt').setRequestConfig({
      responseType: 'arraybuffer'
    });
  }

}

export default APIResourceBillingPeriod
