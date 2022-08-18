import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceLicense} from './APIAdminResourceLicense';
import {APIResource} from './APIResource';


describe('APIAdminResourceLicense', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceLicense;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/licenses/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceLicense(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceLicense(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@activate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.activate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/activate`);
    });
  });

  describe('@deactivate', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.deactivate();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/deactivate`);
    });
  });

  describe('@resend', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resend();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/resend`);
    });
  });

  describe('@download', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.download();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/download`);
    });
  });

});
