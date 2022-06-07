import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceAccountService} from "./APIAdminResourceAccountService";
import {APIResource} from "./APIResource";


describe('APIAdminResourceAccountService', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceAccountService;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceAccountService(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/account-services/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceAccountService(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/account-services/1/activate');
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

  describe('@deactivate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deactivate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/account-services/1/deactivate');
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

});
