import {API} from "../API";
import {APIResourceBillingPeriod} from "./APIResourceBillingPeriod";
import {APIResource} from "./APIResource";
import {APIResourceUser} from "./APIResourceUser";


describe('APIResourceBillingPeriod', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceBillingPeriod;
  let resourceUser: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    resourceUser = new APIResourceUser(api, 1);
    service = new APIResourceBillingPeriod(resourceUser, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users/1/billing-periods/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceBillingPeriod(resourceUser, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@receipt', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.receipt();
      const requestConfigObject = {"responseType": "arraybuffer"}
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/billing-periods/1/receipt');
      expect(call['requestConfig']).toEqual(requestConfigObject);
    });
  });

});
