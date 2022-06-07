import {API} from "../API";
import {APIAdminResource} from "./APIAdminResource";
import {APIAdminResourceUser} from "./APIAdminResourceUser";
import {APIAdminResourceUserAccount} from "./APIAdminResourceUserAccount";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";


describe('APIAdminResourceUser', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIAdminResourceUserAccount;
  let api: API;
  let adminResource: APIAdminResource;
  let adminResourceUser: APIAdminResourceUser;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    adminResourceUser = new APIAdminResourceUser(adminResource, 1);
    service = new APIAdminResourceUserAccount(adminResourceUser);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/admin/users/1/account');
  });

  describe('@roles', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.roles();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/users/1/account/roles');
    });
  });

  describe('@role', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.role(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/users/1/account/roles/1');
    });

    it('should throw error if resource ID is missing', () => {
      try {
        // @ts-ignore
        service.role();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('@services', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.services();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/admin/users/1/account-services');
    });
  });

  describe('@update', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.update();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/admin/users/1/update-account');
    });
  });

});
