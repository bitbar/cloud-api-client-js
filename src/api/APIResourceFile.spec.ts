import {API} from "../API";
import {APIResourceFile} from "./APIResourceFile";
import {APIList} from "./APIList";
import {APIResource} from "./APIResource";
import {APIResourceUser} from "./APIResourceUser";


describe('APIResourceFile', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceFile;
  let userResource: APIResourceUser;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, 1);
    service = new APIResourceFile(userResource, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/users/1/files/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceFile(userResource, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.file();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/files/1/file');
    });
  });

  describe('@icon', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.icon();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/users/1/files/1/icon');
    });
  });

  describe('@tags', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.tags();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/users/1/files/1/tags');
    });
  });

});
