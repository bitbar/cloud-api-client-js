import {API} from '../API';
import {APIResourceAccountService} from './APIResourceAccountService';
import {APIResource} from './APIResource';

describe('APIResourceAccountService', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccountService;
  let api: API;
  const baseId = 1;
  const baseUrl = `/account-services/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAccountService(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceAccountService(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@billingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.billingPeriod();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/billing-period`);
    });
  });

});
