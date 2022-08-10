import {API} from "../API";
import {APIResourceAccount} from "./APIResourceAccount";
import {APIResource} from "./APIResource";


describe('APIResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccount;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAccount(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/accounts/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceAccount(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@concurrencyStatus', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.concurrencyStatus();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/accounts/1/concurrency-status');
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/accounts/1/preferences');
    });
  });

});
