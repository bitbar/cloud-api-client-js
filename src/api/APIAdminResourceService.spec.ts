import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceService} from "./APIAdminResourceService";
import {APIResource} from "./APIResource";


describe('APIAdminResourceService', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceService;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceService(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/services/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceService(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/services/1/activate');
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

});
