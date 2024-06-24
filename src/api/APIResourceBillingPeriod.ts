import {APIResource} from './APIResource'
import {BillingPeriod} from './models/BillingPeriod';
import {NoData, NoQueryParams} from './models/HTTP';
import {APIResourceAccount} from './APIResourceAccount';




export class APIResourceBillingPeriod extends APIResource<BillingPeriod, NoQueryParams, NoData> {

  /**
   * /billing-periods/{id}
   */
  constructor(parent: APIResourceAccount, id: number) {
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
