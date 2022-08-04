import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceLicense} from "./APIAdminResourceLicense";
import {APIResource} from "./APIResource";


describe('APIAdminResourceLicense', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceLicense;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceLicense(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/licenses/1');
  });

  it('should throw error if resource ID is missing', () => {
    try {
      // @ts-ignore
      service = new APIAdminResourceLicense(adminResource);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/licenses/1/activate');
    });
  });

  describe('@deactivate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deactivate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/licenses/1/deactivate');
    });
  });

  describe('@resend', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resend();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/licenses/1/resend');
    });
  });

  describe('@download', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.download();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/licenses/1/download');
    });
  });

});
