import {API} from '../API';
import {APIResourceAccount} from './APIResourceAccount';
import {APIResource} from './APIResource';
import APIList from './APIList';


describe('APIResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccount;
  let api: API;
  const baseId = 1;
  const baseUrl = `/accounts/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceAccount(api, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceAccount(api, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@concurrencyStatus', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.concurrencyStatus();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/concurrency-status`);
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/preferences`);
    });
  });

  describe('@users', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.users();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/users`);
    });
  });

  describe('@removeUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.removeUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}`);
    });
  });

  describe('@disableUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.disableUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/disable`);
    });
  });

  describe('@enableUser', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.enableUser(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/enable`);
    });
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const userId = 123;
      const call = service.resendActivation(userId);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/${userId}/resend-activation`);
    });
  });

});
