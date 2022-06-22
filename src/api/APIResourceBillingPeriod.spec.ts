import {API} from "../API";
import {APIResourceBillingPeriod} from "./APIResourceBillingPeriod";
import APIResource from "./APIResource";


describe('APIResourceBillingPeriod', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceBillingPeriod;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceBillingPeriod(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/billing-periods/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceBillingPeriod(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@receipt', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.receipt();
      const requestConfigObject = {"responseType": "arraybuffer"}
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/billing-periods/1/receipt');
      expect(call['requestConfig']).toEqual(requestConfigObject);
    });
  });

});
