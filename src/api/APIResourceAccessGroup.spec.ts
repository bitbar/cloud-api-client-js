import {API} from "../API";
import {APIResourceAccessGroup} from "./APIResourceAccessGroup";
import {APIResource} from "./APIResource";
import {APIAdminResource} from "./APIAdminResource";
import {APIList} from "./APIList";


describe('APIResourceAccessGroup', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceAccessGroup;
  let api: API;
  let adminResource: APIAdminResource;
  const baseId = 1;
  const baseUrl = `/access-groups/${baseId}`;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    adminResource = new APIAdminResource(api);
    service = new APIResourceAccessGroup(adminResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceAccessGroup(adminResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@users', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.users();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/users`);
    });
  });

  describe('@user', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.user(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/users/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.user(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

  describe('@resources', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resources();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/resources`);
    });
  });

  describe('@resource', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.resource(1);
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/resources/1`);
    });

    it('should throw error if resource ID is nulll', () => {
      const id: any = undefined;
      expect(() => service.resource(id)).toThrow(new Error('Resource ID cannot be null!'));
    });
  });

});
