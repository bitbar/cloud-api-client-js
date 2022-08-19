import {Method} from 'axios';
import {API} from '../API';
import {APIList} from './APIList';
import {APIResourceUser} from './APIResourceUser';
import {AccountService, ServicePaymentStatus} from './models/AccountService';
import {CollectionQueryParams, NoData, NoQueryParams} from './models/HTTP';
import {Service, ServiceData} from './models/Service';


export class APIListServices extends APIList<ServicePaymentStatus, NoQueryParams, ServiceData> {

  protected ALLOWED_HTTP_METHODS: Array<Method> = ['POST'];

  /**
   * /services
   */
  constructor(parent: API | APIResourceUser) {
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

  byPrice() {
    return new APIList<AccountService, CollectionQueryParams, void>(this).sort('centPrice');
  }

  availableByPrice() {
    return new APIList<AccountService, CollectionQueryParams, void>(this).push('available').sort('centPrice');
  }

}

export default APIListServices
