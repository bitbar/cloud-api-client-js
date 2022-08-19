import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceService} from './APIAdminResourceService';
import {APIResource} from './APIResource';


describe('APIAdminResourceService', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceService;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/services/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceService(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceService(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/activate`);
      expect((<any>call).requestConfig.method).toEqual('POST');
    });
  });

});
