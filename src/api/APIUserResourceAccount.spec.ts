import {API} from '../API';
import {APIUserResourceAccount} from './APIUserResourceAccount';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';


describe('APIUserResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIUserResourceAccount;
  let api: API;
  let resourceUser: APIResourceUser;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/account`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });

    resourceUser = new APIResourceUser(api, baseId)
    service = new APIUserResourceAccount(resourceUser);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(baseUrl);
  });

  describe('@additionalUsers', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.additionalUsers();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/additional-users`);
    });
  });

  describe('@additionalUser', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.additionalUser(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/additional-users/1`);
    });
  });

  describe('@serviceBillingPeriod', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.serviceBillingPeriod(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}-services/1/billing-period`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.serviceBillingPeriod(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });
});
