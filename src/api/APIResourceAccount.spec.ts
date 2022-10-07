import {API} from '../API';
import {APIResourceAccount} from './APIResourceAccount';
import {APIResource} from './APIResource';


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

  describe('@visualTestsAccess', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.visualTestsAccess();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/visual-tests-access`);
    });
  });

});
