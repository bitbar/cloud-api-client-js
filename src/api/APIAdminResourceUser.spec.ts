import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceUser} from "./APIAdminResourceUser";
import {APIAdminResourceUserAccount} from "./APIAdminResourceUserAccount";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";


describe('APIAdminResourceUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceUser;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceUser(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/users/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceUser(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
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
      expect(call.toUrl()).toEqual('/admin/users/1/disable');
    });
  });

  describe('@enable', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.enable();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/users/1/enable');
    });
  });

  describe('@licenses', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.licenses();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/users/1/licenses');
    });
  });

  describe('@resendActivation', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resendActivation();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/users/1/resend-activation');
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
