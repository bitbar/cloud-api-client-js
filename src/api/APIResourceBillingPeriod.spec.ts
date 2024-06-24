import {API} from '../API';
import {APIResourceBillingPeriod} from './APIResourceBillingPeriod';
import {APIResource} from './APIResource';
import {APIResourceAccount} from './APIResourceAccount';


describe('APIResourceBillingPeriod', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceBillingPeriod;
  let resourceAccount: APIResourceAccount;
  let api: API;
  const baseId = 1;
  const baseUrl = `/accounts/${baseId}/billing-periods/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });

    resourceAccount = new APIResourceAccount(api, baseId);
    service = new APIResourceBillingPeriod(resourceAccount, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceBillingPeriod(resourceAccount, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@receipt', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.receipt();
      const requestConfigObject = {'responseType': 'arraybuffer'}
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/receipt`);
      expect(call['requestConfig']).toEqual(requestConfigObject);
    });
  });

});
