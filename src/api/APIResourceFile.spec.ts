import {API} from '../API';
import {APIResourceFile} from './APIResourceFile';
import {APIList} from './APIList';
import {APIResource} from './APIResource';
import {APIResourceUser} from './APIResourceUser';


describe('APIResourceFile', () => {
  const cloudUrl = 'https://cloud.bitbar.com';
  let service: APIResourceFile;
  let userResource: APIResourceUser;
  let api: API;
  const baseId = 1;
  const baseUrl = `/users/${baseId}/files/${baseId}`

  beforeEach(() => {
    api = new API({
      baseURL: '',
      cloudUrl
    });
    userResource = new APIResourceUser(api, baseId);
    service = new APIResourceFile(userResource, baseId);
  });

  it('should initialize proper endpoint path', () => {
    expect(service.toUrl()).toEqual(`${baseUrl}`);
  });

  it('should throw error if resource ID is missing', () => {
    const id: any = undefined;
    expect(() => new APIResourceFile(userResource, id)).toThrow(new Error('Resource ID cannot be null!'));
  });

  describe('@file', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.file();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/file`);
    });
  });

  describe('@icon', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.icon();
      expect(call).toBeInstanceOf(APIResource);
      expect(call.toUrl()).toEqual(`${baseUrl}/icon`);
    });
  });

  describe('@tags', () => {
    it('should initialize proper endpoint path', () => {
      const call = service.tags();
      expect(call).toBeInstanceOf(APIList);
      expect(call.toUrl()).toEqual(`${baseUrl}/tags`);
    });
  });

});
