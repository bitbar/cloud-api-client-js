import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceFramework} from './APIAdminResourceFramework';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIAdminResourceFramework', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceFramework;
  let api: API;
  let adminResource: APIAdminResource;
  const baseUrl = '/admin/frameworks';

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceFramework(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}/1`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceFramework(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@config', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.config();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/config`);
    });
  });

  describe('@requiredRoles', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.requiredRoles();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/1/required-roles`);
    });
  });

});
