import {API} from "../API";
import {APIResourceAccessGroup} from "./APIResourceAccessGroup";
import APIResource from "./APIResource";
import APIAdminResource from "./APIAdminResource";
import APIList from "./APIList";


describe('APIResourceAccessGroup', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccessGroup;
  let api: API;
  let adminResource: APIAdminResource;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIResourceAccessGroup(adminResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/access-groups/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceAccessGroup(adminResource, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@users', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.users();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/access-groups/1/users');
    });
  });

  describe('@user', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.user(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/access-groups/1/users/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.user(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@resources', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resources();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/access-groups/1/resources');
    });
  });

  describe('@resource', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resource(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/access-groups/1/resources/1');
    });

    it('should throw error if resource ID is nulll', () => {
      expect(() => service.resource(null as any)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

});
