import {API} from "../API";
import {APIUserResourceAccount} from "./APIUserResourceAccount";
import {APIList} from "./APIList";
import APIResource from "./APIResource";


describe('APIUserResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIUserResourceAccount;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIUserResourceAccount(api);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/account');
  });

  describe('@additionalUsers', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.additionalUsers();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/account/additional-users');
    });
  });

  describe('@additionalUser', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.additionalUser(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/account/additional-users/1');
    });
  });

  describe('@serviceBillingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.serviceBillingPeriod(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/account-services/1/billing-period');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.serviceBillingPeriod(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });
});
