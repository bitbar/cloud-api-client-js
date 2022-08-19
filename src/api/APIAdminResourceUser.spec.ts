import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceUser} from './APIAdminResourceUser';
import {APIAdminResourceUserAccount} from './APIAdminResourceUserAccount';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIAdminResourceUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceUser;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/users/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceUser(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceUser(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  it('should allow only POST requests', () => {
    try {
      service.get();
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      service.delete();
    } catch (error) {
      expect(error).toBeDefined();
    }
    try {
      service.method('put');
    } catch (error) {
      expect(error).toBeDefined();
    }
    service.post();
    expect((<any>service).requestConfig.method).toEqual('POST');
  });

  describe('@disable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.disable();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/disable`);
    });
  });

  describe('@enable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.enable();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/enable`);
    });
  });

  describe('@licenses', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.licenses();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/licenses`);
    });
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendActivation();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/resend-activation`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@account', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.account();
      expect(call).toBeInstanceOf(APIAdminResourceUserAccount);
    });
  });

});
