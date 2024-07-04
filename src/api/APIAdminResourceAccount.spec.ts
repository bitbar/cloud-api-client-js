import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceAccount} from './APIAdminResourceAccount';
import {APIList} from './APIList';
import {APIResource} from './APIResource';


describe('APIAdminResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceAccount;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/admin/accounts/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceAccount(adminResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(baseUrl);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceAccount(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@roles', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.roles();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/roles`);
    });
  });

  describe('@role', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.role(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/roles/1`);
    });
  });

  describe('@accountServices', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.accountServices();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/accounts/1/account-services');
    });
  });

  describe('@preferences', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.preferences();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/accounts/1/preferences');
    });
  });

});
