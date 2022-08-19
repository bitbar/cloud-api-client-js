import {Method} from 'axios';
import {NoData} from './APIEntity';
import {APIList} from './APIList'
import {APIResourceUser} from './APIResourceUser';
import {AccountService, PaymentMethod, ServicePaymentStatus} from './models/AccountService';
import {CollectionQueryParams, NoQueryParams} from './models/HTTP';
import {Service} from './models/Service';


export interface ServiceData {
  address?: string;
  braintreeNonce?: string;
  cardNumber?: string;
  city?: string;
  count?: number;
  country?: string;
  cvv?: string;
  email?: string;
  expirationDate?: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  paymentMethod: PaymentMethod;
  phone?: string;
  serviceId: number;
  state?: string;
  stripeToken?: string;
  vatId?: string;
  zip?: string;
}

export class APIListServices extends APIList<ServicePaymentStatus, NoQueryParams, ServiceData> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ['POST'];

  /**
   * /services
   */
  constructor(parent: APIResourceUser) {
    super(parent);
    this.push('services');
  }

  // /services/available
  available() {
    return new APIList<Service, CollectionQueryParams, NoData>(this).push('available');
  }

  active() {
    const apiList = new APIList<AccountService, CollectionQueryParams, NoData>(this);
    if (this.first === 'me') {
      apiList.push('active');
    } else {
      apiList.params({
        notArchived: true
      });
    }
    return apiList;
  }

}

export default APIListServices
