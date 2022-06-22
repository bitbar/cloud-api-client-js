import {API} from "../API";
import {APIResourceFile} from "./APIResourceFile";
import {APIList} from "./APIList";
import APIResource from "./APIResource";


describe('APIResourceFile', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceFile;
  let api: API;

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    service = new APIResourceFile(api, 1);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual('/files/1');
  });

  it('should throw error if resource ID is missing', () => {
    expect(() => new APIResourceFile(api, null as any)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.file();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/files/1/file');
    });
  });

  describe('@icon', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.icon();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual('/files/1/icon');
    });
  });

  describe('@tags', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.tags();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual('/files/1/tags');
    });
  });

});
