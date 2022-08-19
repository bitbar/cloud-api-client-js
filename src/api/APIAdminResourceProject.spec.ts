import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceProject} from './APIAdminResourceProject';
import {APIResource} from './APIResource';


describe('APIAdminResourceProject', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceProject;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/projects/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceProject(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceProject(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@unarchive', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.unarchive();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/unarchive`);
    });
  });

});
