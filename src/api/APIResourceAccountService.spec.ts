import {API} from "../API";
import {APIResourceAccountService} from "./APIResourceAccountService";
import {APIResource} from "./APIResource";

describe('APIResourceAccountService', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccountService;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAccountService(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/account-services/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceAccountService(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@billingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.billingPeriod();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/account-services/1/billing-period');
    });
  });

});
