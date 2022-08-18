import {API} from '../API';
import {APIAdminResource} from './APIAdminResource';
import {APIAdminResourceAccount} from './APIAdminResourceAccount';


describe('APIAdminResourceAccount', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceAccount;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIAdminResourceAccount(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/accounts/1');
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIAdminResourceAccount(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

});
